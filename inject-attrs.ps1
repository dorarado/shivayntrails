$filePath = 'c:\Users\ZAZAA\OneDrive\Desktop\project 2\shivayntrails\index.html'
$content = Get-Content $filePath -Raw -Encoding UTF8
$content = $content.Replace('class="feature-card"', 'class="feature-card" data-tilt')
$content = $content.Replace('class="adventure-card"', 'class="adventure-card" data-tilt')
$content = $content.Replace('class="category-card"', 'class="category-card" data-tilt')
$content = $content.Replace('class="btn btn-primary"', 'class="btn btn-primary magnetic-btn"')
$content = $content.Replace('class="btn btn-whatsapp"', 'class="btn btn-whatsapp magnetic-btn"')
[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done - added data-tilt and magnetic-btn attributes"
