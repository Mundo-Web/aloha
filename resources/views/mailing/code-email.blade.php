<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ $title }}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #A191B8;">
  <!-- Wrapper para mejor compatibilidad -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#A191B8">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <!-- Logo -->
        <img src="https://vua.pe/assets/img/logo.png" alt="Vuá" width="100" style="display: block; margin: 0 auto;">
        
        <!-- Contenedor principal -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(0,0,0,0.2); margin: 20px auto; border-radius: 10px;">
          <tr>
            <td align="center" style="padding: 40px 20px; color: #ffffff;">
              <h1 style="font-size: 48px; margin: 0 0 20px 0; color: #ffffff;">¡Bien!</h1>
              <h2 style="font-weight: normal; margin: 0 0 20px 0; color: #ffffff;">Estás a punto de convertirte en un Vuá lover ✨</h2>
              <p style="margin: 0 0 20px 0; color: #ffffff;">Tu código de verificación es:</p>
              
              <!-- Código de verificación -->
              <table border="0" cellspacing="4" cellpadding="0" style="margin: 20px auto;">
                <tr>
                  @foreach(str_split(substr($preUser['confirmation_token'], 0, 6)) as $digit)
                    <td style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; font-size: 24px; font-weight: bold; min-width: 45px; text-align: center; color: #ffffff; margin: 0 4px;">{{ $digit }}</td>
                  @endforeach
                </tr>
              </table>

              <!-- Beneficios -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td align="center" style="color: #ffffff; padding: 5px;">• Guarda tus fórmulas únicas</td>
                </tr>
                <tr>
                  <td align="center" style="color: #ffffff; padding: 5px;">• Beneficios en tu cumpleaños</td>
                </tr>
                <tr>
                  <td align="center" style="color: #ffffff; padding: 5px;">• Recibe las promos del mes primero</td>
                </tr>
              </table>

              <!-- Botón de confirmación -->
              {{-- <table border="0" cellspacing="0" cellpadding="0" style="margin: 20px auto;">
                <tr>
                  <td align="center" style="border-radius: 30px; background-color: #A191B8;">
                    <a href="{{ route('confirmation', $preUser['confirmation_token']) }}"
                      style="display: inline-block; padding: 12px 24px; color: #ffffff; text-decoration: none; font-weight: bold;">
                      CONFIRMAR CORREO
                    </a>
                  </td>
                </tr>
              </table> --}}
            </td>
          </tr>
        </table>

        <!-- Redes sociales -->
        <table border="0" cellspacing="0" cellpadding="0" style="margin: 20px auto;">
          <tr>
            @foreach ($socials as $social)
              <td style="padding: 0 10px;">
                <a href="{{ $social['link'] }}" style="color: #ffffff; text-decoration: none;">
                  <span class="{{ $social['icon'] }}" style="color: #ffffff;">{{ $social['name'] }}</span>
                </a>
              </td>
            @endforeach
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
