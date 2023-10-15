"use client"
import { FormEvent, FC, useState, ChangeEvent } from "react"
import { Toaster, toast } from "sonner"
import { QRCodeCanvas } from "qrcode.react"
import { useColor } from "react-color-palette"
import { FormComp } from "./FormComp"
import { QRColorPicker } from "./QRColorPicker"

export const HomePage: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [logo, setLogo] = useState<string | null>(null)
  const [bgColor, setBgColor] = useColor("#fff")
  const [qrColor, setQrColor] = useColor("#000")
  const [showQr, setShowQr] = useState<boolean>(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.dir("GEN")
    if (!url || url.length <= 0) {
      toast.error("el link no puede estar vacio.")
      return
    }
    // gen logo
    setShowQr(true)
  }

  const handleUpdateUrl = (url: string | null) => {
    setUrl(url)
    setShowQr(false)
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
      setLogo(imgLogo)
    } else {
      setImageUrl("")
      setLogo(null)
      console.log("ERRPR!")
      toast.error(
        "El tipo de archivo de la imagen no es válido. Se esperaba un archivo PNG o JPG."
      )
    }
  }

  const handleDownload = () => {
    console.log("Starting download process")
    const canvas = document.getElementById("resultQR") as any
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const downloadLink = document.createElement("a")
    downloadLink.download = "QRCode.png"
    downloadLink.href = canvas.toDataURL("image/png")
    downloadLink.click()
    console.log("Download link clicked")
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
      <div className="flex w-full flex-wrap justify-center mt-10">
        <FormComp
          handleSubmit={handleSubmit}
          handleUpdateUrl={handleUpdateUrl}
          handleUploadFile={handleUploadFile}
          url={url}
        />
        <QRColorPicker
          bgColor={bgColor}
          setBgColor={setBgColor}
          qrColor={qrColor}
          setQrColor={setQrColor}
        />
        {showQr && (
          <div className="flex justify-center p-4 flex-col items-center gap-4">
            <QRCodeCanvas
              id="resultQR"
              size={500}
              value={url ? url : ""}
              includeMargin
              bgColor={bgColor?.hex ? bgColor.hex : "#fff"}
              fgColor={qrColor?.hex ? qrColor.hex : "#000"}
              imageSettings={{
                src: logo ? logo : "",
                height: 70,
                width: 70,
                excavate: logo ? true : false,
              }}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
              }}
            />
            <button onClick={handleDownload}>DESCARGAR</button>
          </div>
        )}
      </div>
      <Toaster position="top-right" richColors />
    </div>
  )
}
