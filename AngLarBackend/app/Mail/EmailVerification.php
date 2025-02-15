<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

use App\Models\Customer;






class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;
    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct(Customer $user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->subject('E-mail megerősítés')
                    ->view('emails.verify')
                    ->with([
                        'verificationUrl' => route('email.verify', ['id' => $this->user->id,
                        'hash' => sha1($this->user->email)]),
                    ]);

                    return $this->subject('E-mail megerősítés')
                    ->view('emails.verify')
                    ->with(['url' => $verificationUrl]);

    }



    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Email Verification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.name',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
