"use client"
import Image from "next/image"
import { FormEvent, FC, useState, ChangeEvent } from "react"
import { Toaster, toast } from "sonner"

interface FileInput extends HTMLInputElement {
  files: FileList
}

export const HomePage: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [logo, setLogo] = useState<File | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.dir("GEN")
    if(!url || url.length <= 0){
      toast.error("el link no puede estar vacio.")
      return
    }
  }

  const handleUpdateUrl = (url: string | null) => {
    if (url) setUrl(url)
  }

  const handleUploadFile = (uploaded: FileList | null) => {
    if (uploaded === null) {
      setImageUrl(null)
      setLogo(null)
      return
    }
    let imgLogo: string | null = null
    if (uploaded && uploaded.length > 0) {
      imgLogo = URL.createObjectURL(uploaded[0])
    }

    if (
      imgLogo &&
      uploaded?.length > 0 &&
      uploaded[0].type.startsWith("image/")
    ) {
      setImageUrl(imgLogo)
      setLogo(uploaded[0])
    } else {
      setImageUrl("")
      setLogo(null)
      console.log("ERRPR!")
      toast.error(
        "El tipo de archivo de la imagen no es válido. Se esperaba un archivo PNG o JPG."
      )
    }
  }

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8 w-full">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white-900 sm:text-4xl">
          Genera un QR para tu negocio
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Totalmente Gratis!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="link"
              aria-required
              className="block text-sm font-semibold leading-6 text-gray-200"
            >
              Link
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="link"
                value={url ? url : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUpdateUrl(e?.target?.value)
                }
                id="link"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="Logo"
              className="block text-sm font-semibold leading-6 text-gray-200"
            >
              Logo
            </label>
            <div className="mt-2.5">
              <input
                type="file"
                name="logo"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUploadFile(e.target.files)
                }
                id="logo"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Generar
          </button>
        </div>
      </form>
      <div>
        {imageUrl && (
          <Image src={imageUrl} width={100} height={100} alt="Uploaded image" />
        )}
      </div>
      <Toaster position="top-right" richColors />
    </div>
  )
}
