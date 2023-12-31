import React, { useEffect } from "react";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
// import { useRouter } from "next/router";
import { Page } from "@/components/layouts/Page";
import { PageContent } from "@/components/layouts/PageContent";
import { Container } from "@/components/layouts/Container";
import { GoogleLogo } from "@/components/icons/JalaLogo";
// import { LoadingLogo } from "@/components/icons/JalaLogo";

export default function Login({}) {
  const { data: session, status } = useSession();
  // const router = useRouter();
  // const error = router.query?.error;

  // toaster.error(error);
  useEffect(() => {
    if (session && status == "authenticated") {
      // router.push("/");
      window.location.assign("/");
    }
  }, [session, status]);

  // console.log(router);

  // console.log(session, status, router.query);

  return (
    <>
      <Head>
        <title>Jala.cc Url Shortener</title>
        <meta
          name="description"
          content="Create a custom short links and QR Codes. Share it anywhere, track the clicks. Only for Warga Jala."
        />

        <meta property="og:url" content="https://jala.cc" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jala.cc Url Shortener" />
        <meta
          property="og:description"
          content="Create a custom short links and QR Codes. Share it anywhere, track the clicks. Only for Warga Jala."
        />
        <meta
          property="og:image"
          content="https://strapi.jala.tech/uploads/jalacc_og_image_8fcefe928e.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="jala.cc" />
        <meta property="twitter:url" content="https://jala.cc" />
        <meta name="twitter:title" content="Jala.cc Url Shortener" />
        <meta
          name="twitter:description"
          content="Create a custom short links and QR Codes. Share it anywhere, track the clicks. Only for Warga Jala."
        />
        <meta
          name="twitter:image"
          content="https://strapi.jala.tech/uploads/jalacc_og_image_8fcefe928e.jpg"
        />
      </Head>
      <Page>
        <PageContent>
          <Container className="space-y-5 ">
            <div className="flex flex-col h-[100svh] backdrop-saturate-125">
              <div className="flex items-center justify-center flex-1 flex-col space-y-10 px-6 pt-10 text-slate-800">
                <div className="text-5xl font-bold mt-6">Jala.cc 🍤</div>
                <div className="text-xl text-center">
                  Create a custom short links and QR Codes.
                  <br></br>
                  Share it anywhere, track the clicks.
                  <br></br>
                  Only for Warga Jala.
                </div>
              </div>
              <div className="h-3/4 bg-[url('https://strapi.jala.tech/uploads/aldy_uang_1be0363233.webp')] bg-center bg-cover max-h-screen">
                <div className="h-2/3"></div>
                <div className="flex items-center justify-center flex-1 flex-col space-y-6 px-4 text-white">
                  <div className="rounded-3xl shadow-lg px-8 py-3 bg-white text-blue-600 font-medium flex">
                    <button
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                      className="flex justify-center space-x-2 items-center"
                    >
                      <GoogleLogo width={25} height={20} className="mr-2" />
                      Continue with JALA Email
                    </button>
                  </div>
                  {/* <div className="text-jala-white font-medium flex justify-center text-center">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="text-white font-medium"></div>
                      <LoginNIKDisclosure token={csrfToken} />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Container>
        </PageContent>
      </Page>
    </>
  );
}
// export const getStaticProps: GetStaticProps<{
//   seo: NextSeoProps;
//   context: GetServerSidePropsContext
// }> = async () => {
//   return {
//     props: {
//       seo: {
//         title: `Login | Warga JALA`,
//       },
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// };

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
