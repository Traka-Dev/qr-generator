import { ColorPicker, IColor, useColor } from "react-color-palette"
import "react-color-palette/css"

export interface QRColorPickerProps {
  bgColor: IColor
  setBgColor: (color: IColor) => void
  qrColor: IColor
  setQrColor: (color: IColor) => void
}

export const QRColorPicker = ({
  bgColor,
  setBgColor,
  qrColor,
  setQrColor,
}: QRColorPickerProps) => {
  return (
    <div className="flex justify-center gap-x-8 gap-y-6 sm:grid-cols-2 my-4 flex-wrap">
      <div className="sm:col-span-1 max-w-md">
        <label
          htmlFor="link"
          aria-required
          className="block text-sm font-semibold leading-6 text-gray-200"
        >
          Color del fondo
        </label>
        <div className="mt-2.5">
          <ColorPicker
            color={bgColor}
            hideInput={["rgb", "hsv"]}
            onChange={setBgColor}
          />
        </div>
      </div>
      <div className="sm:col-span-1 max-w-md">
        <label
          htmlFor="link"
          aria-required
          className="block text-sm font-semibold leading-6 text-gray-200"
        >
          Color del QR
        </label>
        <div className="mt-2.5">
          <ColorPicker
            color={qrColor}
            hideInput={["rgb", "hsv"]}
            onChange={setQrColor}
          />
        </div>
      </div>
    </div>
  )
}
