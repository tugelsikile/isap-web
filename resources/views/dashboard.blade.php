<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Dashboard</title>
</head>

<body style="background:url('{{asset('images/background_4.png')}}');background-size:cover">

    <div id="dashboard"></div>

    <script src="{{asset('js/dashboard/dashboard.js')}}"></script>
</body>

</html>