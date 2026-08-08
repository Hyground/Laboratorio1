param(
    [string]$OutputPath = (Join-Path $PSScriptRoot '..\docs\evidencias\tsc-strict.png')
)

$projectPath = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$outputDirectory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$terminalCommand = @"
`$Host.UI.RawUI.WindowTitle = 'CineStream - Evidencia TypeScript Strict'
Set-Location -LiteralPath '$projectPath'
Write-Host 'CineStream | Validacion TypeScript Strict' -ForegroundColor Cyan
Write-Host ('Directorio: ' + (Get-Location))
Write-Host ''
Write-Host '> npx tsc --noEmit' -ForegroundColor Yellow
npx tsc --noEmit
if (`$LASTEXITCODE -eq 0) {
    Write-Host ''
    Write-Host 'RESULTADO: 0 errores, 0 advertencias' -ForegroundColor Green
    Write-Host 'Compilacion strict completada correctamente.' -ForegroundColor Green
} else {
    Write-Host ('RESULTADO: validacion fallida. Codigo ' + `$LASTEXITCODE) -ForegroundColor Red
}
Start-Sleep -Seconds 20
"@

$process = Start-Process powershell.exe -ArgumentList '-NoLogo', '-NoProfile', '-Command', $terminalCommand -PassThru
Start-Sleep -Seconds 5
$process.Refresh()

Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class WindowCapture {
    [StructLayout(LayoutKind.Sequential)]
    public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
}
'@
Add-Type -AssemblyName System.Drawing

$rect = New-Object WindowCapture+RECT
if ($process.MainWindowHandle -eq 0 -or -not [WindowCapture]::GetWindowRect($process.MainWindowHandle, [ref]$rect)) {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    throw 'No fue posible localizar la ventana de PowerShell para capturarla.'
}

$width = $rect.Right - $rect.Left
$height = $rect.Bottom - $rect.Top
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bitmap.Size)
$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
$process.CloseMainWindow() | Out-Null
Write-Output (Resolve-Path $OutputPath).Path
