"use client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

const FileUploader = ({ files, onChange }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="Identification Document"
          className="msx-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src={"/assets/icons/upload.svg"}
            alt="Upload Icon"
            width={40}
            height={40}
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
