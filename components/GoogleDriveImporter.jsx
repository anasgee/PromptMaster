"use client";

import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import GoogleDrive from "@uppy/google-drive";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/react/dashboard";

const companionUrl =
  process.env.NEXT_PUBLIC_UPPY_COMPANION_URL || "https://companion.uppy.io";

const GoogleDriveImporter = ({ onImport }) => {
  const [message, setMessage] = useState("");
  const [uppy] = useState(() =>
    new Uppy({
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 1024 * 1024,
      },
    })
      .use(GoogleDrive, {
        companionUrl,
      })
      .use(XHRUpload, {
        endpoint: "/api/google-drive-import",
        fieldName: "file",
        formData: true,
        method: "POST",
        responseType: "json",
        getResponseData: (xhr) => JSON.parse(xhr.responseText),
      })
  );

  useEffect(() => {
    const handleSuccess = (file, response) => {
      const importedText = response?.body?.text?.trim();

      if (!importedText) {
        setMessage("No readable text was found in that file.");
        return;
      }

      onImport(importedText);
      setMessage(`Imported ${file.name} from Google Drive.`);
      uppy.cancelAll();
    };

    const handleError = (file, error) => {
      setMessage(error?.message || `Could not import ${file?.name || "file"}.`);
    };

    uppy.on("upload-success", handleSuccess);
    uppy.on("upload-error", handleError);

    return () => {
      uppy.off("upload-success", handleSuccess);
      uppy.off("upload-error", handleError);
      uppy.destroy();
    };
  }, [onImport, uppy]);

  return (
    <div className="google_drive_importer">
      <div className="flex-between gap-3">
        <span className="font-satoshi text-base font-semibold text-gray-700">
          Import prompt data
        </span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          Google Drive
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Dashboard
          uppy={uppy}
          height={320}
          width="100%"
          disableLocalFiles
          proudlyDisplayPoweredByUppy={false}
          hideUploadButton={false}
          showProgressDetails
        />
      </div>

      {message ? (
        <p className="mt-2 text-sm font-medium text-gray-600">{message}</p>
      ) : null}
    </div>
  );
};

export default GoogleDriveImporter;
