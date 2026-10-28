import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Information | Independent Bugatti Concept',
  description: 'Learn how inquiry and vehicle configuration submissions are handled on this independent concept website.',
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto min-h-screen max-w-3xl px-4 pb-20 pt-32 text-gray-300 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bugatti-blue-light">
        Privacy information
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-white">How this demo handles submissions</h1>
      <p className="mt-6 text-sm leading-7">
        This is an independent concept project, not operated by or affiliated with Bugatti Automobiles S.A.S.
        Submissions made here are not sent to Bugatti.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Information collected</h2>
        <p className="text-sm leading-7">
          If configured by the site owner, the inquiry form stores the name, email address, phone number,
          selected vehicle and location, preferred timing, and any notes you submit. The configurator can
          store the selected vehicle specification without contact details.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-white">Use and storage</h2>
        <p className="text-sm leading-7">
          Inquiry records are stored in the site owner&apos;s Supabase database and are intended only to
          respond to the submitted request. No automatic deletion period or email notification is configured
          by this project; the site owner controls database access and deletion.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold text-white">Project owner details</h2>
        <p className="text-sm leading-7">
          The project owner has not supplied a privacy contact address or legal entity for this page. Add
          those details and an appropriate retention period before collecting real customer information.
          Until then, do not submit real personal or confidential information.
        </p>
      </section>
    </article>
  );
}
