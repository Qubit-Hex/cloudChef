<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Cloud chef a Employee management solution and recipe management solution" />
    <meta id='_token_' name="X-CSRF-TOKEN" content="{{ csrf_token() }}" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous">
   
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    
    <title>Cloud Chef - let the cloud to the heavy lifting </title>
  </head>
  <body>
    <noscript>You need to enable JavaScript inorder to the web site to function correctly .</noscript>
    <div id="root">

    </div>
       <script src="{{ asset('js/app.js') }}" type='module'></script>
  </body>
</html>
