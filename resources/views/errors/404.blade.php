<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada | VUA</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <style>
        * {
            font-family: Poppins;
            box-sizing: border-box;
        }

        .bg-vua-purple {
            background-color: #a393c0;
        }

        .bg-vua-light {
            background-color: #e8d8df;
        }

        .text-vua-purple {
            color: #a393c0;
        }

        .border-vua-purple {
            border-color: #a393c0;
        }

        .hover\:bg-vua-purple:hover {
            background-color: #a393c0;
        }
    </style>
</head>

<body class="bg-white min-h-screen flex flex-col">
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <div class="max-w-md mx-auto">
            <h1 class="text-9xl font-bold text-vua-purple">404</h1>

            <div class="mt-6 mb-10">
                <h2 class="text-3xl font-semibold text-gray-700">¡Página no encontrada!</h2>
                <p class="mt-4 text-gray-600">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="/" class="w-full bg-vua-purple text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all">
                    <i class="mdi mdi-home me-1"></i>
                    Inicio
                </a>
                <a href="/test" class="w-full bg-white border border-vua-purple text-vua-purple px-6 py-3 rounded-md hover:bg-vua-purple hover:text-white transition-all">
                    <i class="mdi mdi-flask me-1"></i>
                    Crea tu fórmula
                </a>
            </div>
        </div>
    </main>
</body>

</html>