<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error 404 | {{ env('APP_NAME') }}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <style>
        * {
            font-family: Poppins;
            box-sizing: border-box;
        }

        .bg-aloha-purple {
            background-color: #21133C;
        }

        .bg-aloha-light {
            background-color: #e8d8df;
        }

        .text-aloha-purple {
            color: #21133C;
        }

        .border-aloha-purple {
            border-color: #21133C;
        }

        .hover\:bg-aloha-purple:hover {
            background-color: #21133C;
        }
    </style>
</head>

<body class="bg-white min-h-screen flex flex-col">
    <img src="/images/img/bg-home.png"
        class='absolute h-full w-full top-0 object-cover object-bottom z-0 select-none' alt='Fondo AlohaPeru' />
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center z-20">
        <div class="max-w-md mx-auto text-white">
            <h1 class="text-9xl font-bold ">404</h1>

            <div class="mt-6 mb-10">
                <h2 class="text-3xl font-semibold ">¡Página no encontrada!</h2>
                <p class="mt-4 opacity-75">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8 font-bold">
                <a href="/"
                    class="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all">
                    <i class="mdi mdi-home me-1"></i>
                    Inicio
                </a>
                <a href="/hostings"
                    class="w-full bg-transparent hover:bg-blue-600 border border-white hover:border-blue-600 text-white px-6 py-3 rounded-md hover:text-white transition-all">
                    <i class="mdi mdi-server me-1"></i>
                    Hosting
                </a>
            </div>
        </div>
    </main>
</body>

</html>
