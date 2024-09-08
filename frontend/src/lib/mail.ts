import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@emilntnu.no",
    to: email,
    subject: "Bekreftelse av mail",
    html: `<div>
  <h2>Velkommen til Emil!</h2>
  <br>
  <p>For å fullføre registreringen og aktivere kontoen din, vennligst klikk på lenken nedenfor for å bekrefte e-posten din:</p>
  <p><a href="${confirmLink}">Klikk her for å bekrefte kontoen din</a></p>
  <p>Hvis du ikke har registrert deg hos oss, kan du ignorere denne e-posten.</p>
  <p>Vennlig hilsen,<br>Emil</p>
</div>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@emilntnu.no",
    to: email,
    subject: "Tilbakestill passord",
    html: `
    <div>
    <p> Trykk <a href="${resetLink}">her</a> for å tilbakestille passordet ditt </p>
    </div>`,
  });
};
