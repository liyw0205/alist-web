import { Checkbox, createDisclosure } from "@hope-ui/solid"
import { createSignal, onCleanup } from "solid-js"
import { ModalFolderChoose } from "~/components"
import { useFetch, usePath, useRouter, useT } from "~/hooks"
import { selectedObjs } from "~/store"
import { bus, fsCopy, fsMove, handleRespWithNotifySuccess } from "~/utils"

export const Copy = () => {
  const t = useT()
  const { isOpen, onOpen, onClose } = createDisclosure()
  const [loading, ok] = useFetch(fsCopy)
  const { pathname } = useRouter()
  const { refresh } = usePath()
  const [overwrite, setOverwrite] = createSignal(false)
  const handler = (name: string) => {
    if (name === "copy") {
      onOpen()
      setOverwrite(false)
    }
  }
  bus.on("tool", handler)
  onCleanup(() => {
    bus.off("tool", handler)
  })
  return (
    <ModalFolderChoose
      header={t("home.toolbar.choose_dst_folder")}
      opened={isOpen()}
      onClose={onClose}
      loading={loading()}
      footerSlot={
        <Checkbox
          mr="auto"
          checked={overwrite()}
          onChange={() => {
            setOverwrite(!overwrite())
          }}
        >
          {t("home.conflict_policy.overwrite_existing")}
        </Checkbox>
      }
      onSubmit={async (dst) => {
        const resp = await ok(
          pathname(),
          dst,
          selectedObjs().map((obj) => obj.name),
          overwrite(),
        )
        handleRespWithNotifySuccess(resp, () => {
          refresh()
          onClose()
        })
      }}
    />
  )
}

export const Move = () => {
  const t = useT()
  const { isOpen, onOpen, onClose } = createDisclosure()
  const [loading, ok] = useFetch(fsMove)
  const { pathname } = useRouter()
  const { refresh } = usePath()
  const [overwrite, setOverwrite] = createSignal(false)
  const handler = (name: string) => {
    if (name === "move") {
      onOpen()
      setOverwrite(false)
    }
  }
  bus.on("tool", handler)
  onCleanup(() => {
    bus.off("tool", handler)
  })
  return (
    <ModalFolderChoose
      header={t("home.toolbar.choose_dst_folder")}
      opened={isOpen()}
      onClose={onClose}
      loading={loading()}
      footerSlot={
        <Checkbox
          mr="auto"
          checked={overwrite()}
          onChange={() => {
            setOverwrite(!overwrite())
          }}
        >
          {t("home.conflict_policy.overwrite_existing")}
        </Checkbox>
      }
      onSubmit={async (dst) => {
        const resp = await ok(
          pathname(),
          dst,
          selectedObjs().map((obj) => obj.name),
          overwrite(),
        )
        handleRespWithNotifySuccess(resp, () => {
          refresh()
          onClose()
        })
      }}
    />
    // <CenterIcon tip="move" viewBox="0 0 1024 1024" fill="currentColor">
    //   <path d="M840.704 256h-36.992c-82.624 0-82.496-128-140.864-128H311.232C245.44 128 192 181.44 192 247.296V384h64V247.296C256 216.832 280.832 192 311.232 192h339.456c3.968 6.144 9.024 15.36 12.672 22.208C684.8 253.76 720.704 320 803.712 320h36.992C869.12 320 896 351.104 896 384v392.768c0 30.4-24.832 55.232-55.296 55.232H311.232c-30.4 0-55.232-24.832-55.232-55.232V704h-64v72.768C192 842.624 245.44 896 311.232 896H840.64C906.56 896 960 842.624 960 776.768V384c0-65.856-53.44-128-119.296-128z"></path>
    //   <path d="M497.344 693.824L630.4 563.968c0.128-0.128 0.192-0.32 0.32-0.512 2.816-2.816 5.184-9.536 6.784-13.248 1.344-3.456 1.856-0.64 2.112-4.096 0-0.768 0.384-1.408 0.384-2.112 0-0.512-0.256-0.896-0.256-1.344-0.192-3.84-0.896-5.76-2.24-9.344-1.344-3.264-3.52-6.016-5.76-8.64-0.512-0.64-0.768-1.536-1.344-2.112L497.344 389.632c-12.8-12.864-33.6-6.976-46.4 5.888-12.864 12.8-12.864 33.6 0 46.464l76.864 70.976-429.632 0.064c-18.752 0-33.984 12.8-33.92 30.912-0.064 18.112 15.168 29.696 33.984 29.696h429.632l-76.864 79.552c-12.864 12.864-12.864 33.6 0 46.528 6.4 6.4 14.72 3.776 23.168 3.776s16.832-3.328 23.168-9.664z"></path>
    // </CenterIcon>
  )
}
