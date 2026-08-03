$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:3000/')
$listener.Start()
Write-Host 'Server running on http://localhost:3000'
$root = 'c:\Users\ZAZAA\OneDrive\Desktop\project 2\shivayntrails'

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.LocalPath
    if ($path -eq '/') { $path = '/index.html' }
    $filePath = Join-Path $root $path.TrimStart('/')
    
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mimeTypes = @{
            '.html'='text/html; charset=utf-8'
            '.css'='text/css; charset=utf-8'
            '.js'='application/javascript; charset=utf-8'
            '.png'='image/png'
            '.jpg'='image/jpeg'
            '.jpeg'='image/jpeg'
            '.svg'='image/svg+xml'
            '.ico'='image/x-icon'
            '.webp'='image/webp'
            '.gif'='image/gif'
            '.json'='application/json'
            '.woff2'='font/woff2'
            '.woff'='font/woff'
        }
        if ($mimeTypes.ContainsKey($ext)) {
            $response.ContentType = $mimeTypes[$ext]
        } else {
            $response.ContentType = 'application/octet-stream'
        }
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $response.ContentLength64 = $msg.Length
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.Close()
}
