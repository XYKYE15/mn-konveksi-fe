import React, { useState } from "react";
import LoginModal from "../../components/common/LoginModal";

export default function AdminLoginPage() {
  const [open, setOpen] = useState(true); // otomatis tampil ketika masuk page admin/login

  return (
    <div>
      <LoginModal open={open} onClose={() => setOpen(false)} role="admin" />
    </div>
  );
}
