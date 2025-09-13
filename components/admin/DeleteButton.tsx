"use client";
export default function DeleteButton({ children="Șterge" }:{ children?: React.ReactNode }){
  return (
    <button type="submit" className="text-red-600 hover:underline"
      onClick={(e)=>{ if(!confirm("Sigur vrei să ștergi?")) e.preventDefault(); }}>
      {children}
    </button>
  );
}
