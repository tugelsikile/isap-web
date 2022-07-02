<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>
</head>

<body style="background:url('{{asset('images/background_3.png')}}');background-size:cover">
    <div id="auth"></div>
    <script src="{{asset('js/app.js')}}"></script>
    <script src="{{asset('js/auth/login.js')}}"></script>
</body>

</html>
