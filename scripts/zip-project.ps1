$source = "C:\Users\mehme\.gemini\antigravity\scratch\konya-lider-nakliyat"
$destination = "C:\Users\mehme\Desktop\konya-lider-nakliyat.zip"
$localDestination = "C:\Users\mehme\.gemini\antigravity\scratch\konya-lider-nakliyat\konya-lider-nakliyat.zip"

# Remove existing zip files first to avoid appending
if (Test-Path $destination) { Remove-Item $destination }
if (Test-Path $localDestination) { Remove-Item $localDestination }

# Create a temporary directory to stage files
$tempDir = Join-Path $env:TEMP "konya-lider-nakliyat-stage"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files excluding node_modules, .next, and zip files
Get-ChildItem -Path $source -Exclude "node_modules", ".next", "*.zip", "tsconfig.tsbuildinfo" | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $tempDir -Recurse -Force
}

# Now compress the staging folder contents
Compress-Archive -Path "$tempDir\*" -DestinationPath $localDestination -Force
Copy-Item -Path $localDestination -Destination $destination -Force

# Clean up
Remove-Item $tempDir -Recurse -Force
Write-Host "ZIP files successfully generated at $localDestination and $destination"
