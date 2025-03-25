<?php

namespace App\Http\Controllers;

use App\Helpers\EmailConfig;
use App\Models\Message;
use App\Models\Ordenes;
use App\Models\Social;
use App\Models\User;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use SoDe\Extend\Text;
use Illuminate\Support\Facades\View;

class MailingController extends BasicController
{
    public $model = 'Mailing';

    static function send($email, $subject, $content)
    {
        try {
            $mail = EmailConfig::config();
            $mail->Subject = $subject;
            $mail->isHTML(true);
            $mail->Body = $content;
            $mail->addAddress($email);
            $mail->send();

            return [true, null];
        } catch (\Throwable $th) {
            return [false, $th->getMessage()];
        }
    }

    static function notifyContact(Message $messageJpa)
    {
        try {
            $content = File::get('../storage/app/utils/mailing/contact.html');
            $data =  [
                'contact' => $messageJpa->toArray(),
                'domain' => env('APP_DOMAIN')
            ];
            $mail = EmailConfig::config();
            $mail->Subject = '¡Gracias por escribirnos!';
            $mail->isHTML(true);
            $mail->Body = Text::replaceData($content, JSON::flatten($data), [
                'contact.name' => fn($x) => explode(' ', $x)[0]
            ]);
            $mail->addAddress($messageJpa->email, $messageJpa->name);
            $mail->send();
        } catch (\Throwable $th) {
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }
    }

    static function simpleNotify(string $view, string $email, array $data, array $ccs = [])
    {
        try {

            $socials = Social::where('visible', true)->where('status', true)->get();
            $data =  \array_merge(
                ['socials' => $socials->toArray()],
                $data
            );
            $content = View::make($view, $data)->render();

            $mail = EmailConfig::config();
            $mail->Subject = $data['title'] ?? 'Hola que tal?';
            $mail->isHTML(true);
            $mail->Body = $content;
            $mail->addAddress($email);
            foreach ($ccs as $cc) {
                $mail->addCC($cc);
            }
            $mail->send();
        } catch (\Throwable $th) {
            if (\env('APP_ENV') == 'local') {
                dump($th->getMessage());
            }
        }
    }
}
