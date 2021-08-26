import { Dialog } from '@material-ui/core';
import React from 'react'

const DialogMigrate: any = ({
  children,
  disableBackdropClick,
  disableEscapeKeyDown,
  onClose,
  ...rest
}: any) => {

  const handleClose = (event: any, reason: string) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return false;
    }

    if (disableEscapeKeyDown && reason === "escapeKeyDown") {
      return false;
    }

    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Dialog onClose={handleClose} {...rest} className="comp_dialog">
      {children}
    </Dialog>
  );
}

export default DialogMigrate
