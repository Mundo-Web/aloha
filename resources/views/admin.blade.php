@php
    $route = Route::currentRouteName();
    // $component = Router::components[$route];
    // $admintoInstance = isset($component['adminto-instance']) ? $component['adminto-instance'] : false;
@endphp

<!DOCTYPE html>
<html lang="es">

<head>
    @viteReactRefresh
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>Panel - {{ env('APP_NAME', 'Vuá') }}</title>
    <link rel="shortcut icon" href="/assets/img/favicon.png" type="image/png">

    <meta name="csrf_token" content="{{ csrf_token() }}">

    <link href="/lte/assets/libs/mohithg-switchery/switchery.min.css" rel="stylesheet" type="text/css" />
    <link href="/lte/assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />

    {{-- QuillJs Styles --}}
    <link href="/lte/assets/libs/quill/quill.snow.css" rel="stylesheet" type="text/css" />
    <link href="/lte/assets/libs/quill/quill.bubble.css" rel="stylesheet" type="text/css" />

    {{-- Exportable Scripts --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.1.1/exceljs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

    {{-- DxDataGrid Styles --}}
    <link href="/lte/assets/libs/dxdatagrid/css/dx.light.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
        rel="stylesheet" type="text/css" id="dg-default-stylesheet" />
    <link href="/lte/assets/libs/dxdatagrid/css/dx.dark.compact.css?v=06d3ebc8-645c-4d80-a600-c9652743c425"
        rel="stylesheet" type="text/css" id="dg-dark-stylesheet" disabled="disabled" />

    @if ($route == 'Admin/MailingTemplates.jsx')
        <link rel="stylesheet" href="/lte/assets/libs/codemirror/codemirror.min.css">
        <link rel="stylesheet" href="/lte/assets/libs/codemirror/themes/sode.css">
    @endif

    {{-- Bootstrap Styles --}}
    <link href="/lte/assets/css/config/default/bootstrap.min.css" rel="stylesheet" type="text/css"
        id="bs-default-stylesheet" />
    <link href="/lte/assets/css/config/default/bootstrap-dark.min.css" rel="stylesheet" type="text/css"
        id="bs-dark-stylesheet" disabled="disabled" />

    {{-- App Styles --}}
    <link href="/lte/assets/css/config/default/app.css" rel="stylesheet" type="text/css" id="app-default-stylesheet" />
    <link href="/lte/assets/css/config/default/app-dark.css" rel="stylesheet" type="text/css" id="app-dark-stylesheet"
        disabled="disabled" />

    {{-- icons --}}
    <link href="/lte/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" rel="stylesheet">

    @vite('resources/js/' . $route)
    @inertiaHead

    <style>
        .font-emoji {
            font-family: "Noto Color Emoji", sans-serif;
        }

        .font-bold {
            font-weight: bold;
        }

        .tippy-tooltip {
            padding: 0;
        }

        .dx-datagrid-content .dx-datagrid-table .dx-row>td {
            vertical-align: middle;
        }

        .cursor-pointer {
            cursor: pointer;
        }
    </style>
</head>

<body class="loading"
    data-layout='{"mode": "horizontal", "width": "fluid", "menuPosition": "fixed", "sidebar": { "color": "gradient", "size": "default", "showuser": true}, "topbar": {"color": "light"}, "showRightSidebarOnPageLoad": false}'>
    @inertia

    <div class="rightbar-overlay"></div>
    <script src="/lte/assets/libs/qrcodejs/qrcode.min.js"></script>
    <!-- Extends js -->
    <script src="/assets/js/file.extend.js"></script>
    <script src="/assets/js/storage.extend.js"></script>
    <script src="/assets/js/clipboard.extend.js"></script>

    <!-- Vendor js -->
    <script src="/lte/assets/js/vendor.min.js"></script>

    @if ($route == 'Admin/MailingTemplates.jsx')
        <script src="/lte/assets/libs/jquery-ui/jquery-ui.min.js"></script>
        <script src="/lte/assets/libs/codemirror/codemirror.min.js"></script>
        <script src="/lte/assets/libs/codemirror/beautify-html.min.js"></script>
        <script src="/lte/assets/libs/codemirror/mode/xml/xml.min.js"></script>
        <script src="/lte/assets/libs/codemirror/mode/javascript/javascript.min.js"></script>
        <script src="/lte/assets/libs/codemirror/mode/css/css.min.js"></script>
        <script src="/lte/assets/libs/codemirror/mode/htmlmixed/htmlmixed.min.js"></script>
        <script href="/lte/assets/libs/js-beautify/beautify-html.min.js"></script>
    @endif

    <script src="/lte/assets/libs/quill/quill.min.js"></script>
    <script src="/lte/assets/libs/mohithg-switchery/switchery.min.js"></script>
    <script src="/lte/assets/libs/select2/js/select2.full.min.js"></script>
    <script src="/lte/assets/libs/tippy.js/tippy.all.min.js"></script>

    <!-- App js -->
    <script src="/lte/assets/js/app.js?v={{ uniqid() }}"></script>

    <script src="/lte/assets/libs/dxdatagrid/js/dx.all.js"></script>
    <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.es.js"></script>
    <script src="/lte/assets/libs/dxdatagrid/js/localization/dx.messages.en.js"></script>
    <script src="/lte/assets/libs/moment/min/moment.min.js"></script>
    <script src="/lte/assets/libs/moment/moment-timezone.js"></script>
    <script src="/lte/assets/libs/moment/locale/es.js"></script>
    <script>
        document.addEventListener('click', function(event) {
            const target = event.target;

            if (target.tagName === 'BUTTON' && target.hasAttribute('copy')) {
                let copy = target.getAttribute('copy')
                if (target.hasAttribute('copy-selector')) {
                    copy = document.querySelector(target.getAttribute('copy-selector')).textContent
                }
                Clipboard.copy(copy, () => {
                    console.log('Copiado correctamente')
                })
            }
        });
    </script>
</body>

</html>
