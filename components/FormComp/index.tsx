import { FC, ChangeEvent, FormEventHandler } from "react"

export interface FormPropsType {
  handleSubmit: FormEventHandler<HTMLFormElement>
  handleUpdateUrl: Function
  handleUploadFile: Function
  url: string | null
}

export const FormComp = ({
  handleSubmit,
  handleUpdateUrl,
  handleUploadFile,
  url,
}: FormPropsType) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-xl sm:mt-10 w-full md:w-1/2 px-5"
    >
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
  )
}
