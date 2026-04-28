# Render flyer.html to a 1200x1200 PNG and JPG using Chrome headless.
# Run from the website folder: ./render-flyer.ps1

$ErrorActionPreference = 'Stop'

$here = Split-Path -Parent $MyInvocation.MyCommand.Definition
$flyerHtml = Join-Path $here "flyer.html"
$pngOut = Join-Path $here "assets\craigslist-flyer.png"
$jpgOut = Join-Path $here "assets\craigslist-flyer.jpg"

# Locate Chrome
$chromeCandidates = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)
$chrome = $chromeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { throw "Chrome or Edge not found. Install Chrome or update path." }
Write-Host "Using browser: $chrome"

# Build file URL with proper encoding
$urlPath = $flyerHtml -replace '\\', '/' -replace ' ', '%20' -replace "'", '%27'
$url = "file:///$urlPath"

# Render to a 1500-tall canvas, then crop to 1200x1200 (so footer flex works correctly)
& $chrome --headless=new --disable-gpu --hide-scrollbars `
    --window-size=1200,1500 --force-device-scale-factor=1 `
    --virtual-time-budget=15000 `
    "--screenshot=$pngOut" $url 2>&1 | Out-Null

if (-not (Test-Path $pngOut)) { throw "Screenshot failed — $pngOut not created." }

# Crop 1500-tall capture down to 1200x1200
Add-Type -AssemblyName System.Drawing
$bytes = [System.IO.File]::ReadAllBytes($pngOut)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$tall = [System.Drawing.Image]::FromStream($ms)
$crop = New-Object System.Drawing.Bitmap(1200, 1200)
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.DrawImage($tall, (New-Object System.Drawing.Rectangle(0, 0, 1200, 1200)), 0, 0, 1200, 1200, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$tall.Dispose()
$ms.Dispose()
$crop.Save($pngOut, [System.Drawing.Imaging.ImageFormat]::Png)

# Save JPG variant (smaller file for upload)
$jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$jpgParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$jpgParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
$crop.Save($jpgOut, $jpgEncoder, $jpgParams)
$crop.Dispose()

Write-Host ("DONE.  PNG: {0:N0}b  JPG: {1:N0}b" -f (Get-Item $pngOut).Length, (Get-Item $jpgOut).Length)
