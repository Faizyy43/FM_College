// import UploadCard from "../UploadCard";



// const UploadDocuments = ({ register, setValue, errors }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <UploadCard title="Passport Size Photograph" name="photo" register={register} setValue={setValue} error={errors?.photo} required />
//       <UploadCard title="Signature" name="signature" register={register} setValue={setValue} error={errors?.signature} required />
//       <UploadCard title="10th Marksheet" name="marksheet10" register={register} setValue={setValue} error={errors?.marksheet10} required />
//       <UploadCard title="12th Marksheet" name="marksheet12" register={register} setValue={setValue} error={errors?.marksheet12} required />
//       <UploadCard title="Transfer Certificate (TC)" name="tc" register={register} setValue={setValue} error={errors?.tc} required />
//       <UploadCard title="Character Certificate" name="characterCert" register={register} setValue={setValue} error={errors?.characterCert} required />
//       <UploadCard title="Migration Certificate (Optional)" name="migrationCert" register={register} setValue={setValue} error={errors?.migrationCert} />
//       <UploadCard title="Caste / Category Certificate (Optional)" name="casteCert" register={register} setValue={setValue} error={errors?.casteCert} />
//       <UploadCard title="Income Certificate (Optional)" name="incomeCert" register={register} setValue={setValue} error={errors?.incomeCert} />
//       <UploadCard title="ID Proof (Aadhaar / Passport)" name="idProof" register={register} setValue={setValue} error={errors?.idProof} required />
//     </div>
//   );
// };

// export default UploadDocuments;




// import UploadCard from "../UploadCard";

// const UploadDocuments = ({ register, errors }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <UploadCard title="Passport Size Photograph" name="photo" register={register} error={errors.photo} />
//       <UploadCard title="Signature" name="signature" register={register} error={errors.signature} />
//       <UploadCard title="10th Marksheet" name="marksheet10" register={register} error={errors.marksheet10} />
//       <UploadCard title="12th Marksheet" name="marksheet12" register={register} error={errors.marksheet12} />
//       <UploadCard title="Transfer Certificate (TC)" name="tc" register={register} error={errors.tc} />
//       <UploadCard title="Character Certificate" name="characterCert" register={register} error={errors.characterCert} />
//       <UploadCard title="ID Proof (Aadhaar / Passport)" name="idProof" register={register} error={errors.idProof} />

//       {/* Optional */}
//       <UploadCard title="Migration Certificate (Optional)" name="migrationCert" register={register} />
//       <UploadCard title="Caste / Category Certificate (Optional)" name="casteCert" register={register} />
//       <UploadCard title="Income Certificate (Optional)" name="incomeCert" register={register} />
//     </div>
//   );
// };

// export default UploadDocuments;


import UploadCard from "../UploadCard";

const UploadDocuments = ({ errors, setValue, clearErrors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UploadCard title="Passport Size Photograph" name="photo" setValue={setValue} clearErrors={clearErrors} error={errors.photo} />
      <UploadCard title="Signature" name="signature" setValue={setValue} clearErrors={clearErrors} error={errors.signature} />
      <UploadCard title="10th Marksheet" name="marksheet10" setValue={setValue} clearErrors={clearErrors} error={errors.marksheet10} />
      <UploadCard title="12th Marksheet" name="marksheet12" setValue={setValue} clearErrors={clearErrors} error={errors.marksheet12} />
      <UploadCard title="Transfer Certificate (TC)" name="tc" setValue={setValue} clearErrors={clearErrors} error={errors.tc} />
      <UploadCard title="Character Certificate" name="characterCert" setValue={setValue} clearErrors={clearErrors} error={errors.characterCert} />
      <UploadCard title="ID Proof" name="idProof" setValue={setValue} clearErrors={clearErrors} error={errors.idProof} />

      {/* Optional */}
      <UploadCard title="Migration Certificate (Optional)" name="migrationCert" setValue={setValue} clearErrors={clearErrors} />
      <UploadCard title="Caste Certificate (Optional)" name="casteCert" setValue={setValue} clearErrors={clearErrors} />
      <UploadCard title="Income Certificate (Optional)" name="incomeCert" setValue={setValue} clearErrors={clearErrors} />
    </div>
  );
};

export default UploadDocuments;