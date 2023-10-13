import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import { Page } from "@/components/layouts/Page";
import { PageContent } from "@/components/layouts/PageContent";
import { Container } from "@/components/layouts/Container";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { JalaLogo, LoadingLogo } from "@/components/icons/JalaLogo";
import { LinkItem } from "@/components/homepage/LinkItem";
import { fetcher } from "@/utils/fetcher";

export default function Home() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  // const [links, setLinks] = useState({});

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status == "unauthenticated") {
      signIn();
    }
  }, [session]);

  // console.log(session);

  const handleInputChange = (event: any) => {
    // console.log(event);
    setValue(event.target.value);
    // const { name, value } = event.target;
    // setProfileData((prevSettings) => ({
    //   ...prevSettings,
    //   [name]: value,
    // }));
  };

  // const {
  //   data: link,
  //   error: linkDataError,
  //   isLoading: linkDataLoading,
  // } = useSWR(
  //   session ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/links?` : null,
  //   (url) =>
  //     fetcher(url, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  // );

  // const {
  //   data: user,
  //   error: userDataError,
  //   isLoading: userDataLoading,
  //   // mutate
  // } = useSWR(
  //   session
  //     ? `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/users?filterByFormula=email='${session?.user?.email}'`
  //     : null,
  //   (url) =>
  //     fetcher(url, {
  //       headers: {
  //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  // );

  const {
    data: user,
    error: userDataError,
    isLoading: userDataLoading,
    // mutate,
  } = useSWR(
    session ? `api/user?filterByFormula=email='${session?.user?.email}'` : null,
    (url) => fetcher(url),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const {
    data: links,
    error: linksDataError,
    isLoading: linksDataLoading,
    mutate,
  } = useSWR(
    user?.records
      ? `api/links?filterByFormula=SEARCH('${session?.user?.email}', ARRAYJOIN(email, ";"))`
      : null,
    (url) => fetcher(url),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(user, links);

  // const links = user?.records[0]?.fields?.links;
  // const owner = user?.records[0]?.id;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const shorten = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: value, owner: user?.records[0]?.id }),
    });

    if (shorten.status == 200) {
      setValue("");
      mutate(
        `api/links?filterByFormula=SEARCH('${session?.user?.email}', ARRAYJOIN(email, ";"))`
      );
    } else if (shorten.status == 400) {
      setError(true);
    }
    // console.log(shorten);
  };

  // console.log(links, user);

  return (
    <>
      <Head>
        <title>Jala.cc Url Shortener</title>
        <meta name="description" content="Jala.cc Url Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <PageContent>
          <Container>
            <div className="flex flex-col gap-4 text-slate-700 space-y-2 relative py-16">
              <div className="px-4">
                <form
                  className="form flex flex-row gap-2 relative"
                  onSubmit={handleSubmit}
                >
                  <input
                    value={value}
                    placeholder="Shorten your url here!"
                    className="placeholder:text-slate-400  py-2 mt-1 block w-full rounded-md text-slate-600 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onChange={handleInputChange}
                  />
                  <button
                    className="absolute right-1.5 bottom-1.5 px-4 py-1 rounded-md border text-sm font-semibold border-slate-200"
                    type="submit"
                  >
                    Shorten! 🍤
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-4 px-4">
                {links?.records ? (
                  links?.records.map((link: any, i: number) => (
                    <LinkItem key={link.id} linkId={link.id} />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Container>
        </PageContent>
      </Page>
    </>
  );
}
