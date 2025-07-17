import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function FormTest() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://6878855f63f24f1fdc9e4466.mockapi.io/api/v1/users",
        [data]
      );
      console.log("Berhasil kirim ke MockAPI", response.data);
      alert("Terkirim!");
      reset();
    } catch (err) {
      console.error("Gagal kirim:", err);
      alert("Gagal mengirim data");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Nama" {...register("name")} required />
      <input placeholder="Pekerjaan" {...register("job")} required />
      <button type="submit">Kirim</button>
    </form>
  );
}
