"use client";

import { Role } from "@/dtos/auth/auth.dto";
import { useClerk } from "@clerk/nextjs";
import { Button } from "antd";
import React from "react";

// Custom SignIn Button Component
export const CustomSignInButton: React.FC = () => {
  const { openSignIn } = useClerk();
  return (
    <Button
      className="custom-sign-in-button"
      onClick={() => openSignIn()}
      style={{
        backgroundColor: "#000000",
        color: "white",
        marginRight: "10px",
        border: "1px solid #000000",
      }}
    >
      Đăng nhập
    </Button>
  );
};

// Custom SignUp Button Component
export const CustomSignUpButton: React.FC<{ role?: string }> = ({
  role = Role.Customer,
}) => {
  const { openSignUp } = useClerk();

  const handleSignUp = () => {
    // Use the role provided as prop or default to "user"
    openSignUp({
      afterSignUpUrl: "/",
      redirectUrl: "/",
      unsafeMetadata: {
        role: role,
      },
    });
  };

  return (
    <Button
      className="custom-sign-up-button"
      onClick={handleSignUp}
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "1px solid #000000",
      }}
    >
      Đăng ký
    </Button>
  );
};

// Combined auth buttons component
export const AuthButtons: React.FC<{ signUpRole?: string }> = ({
  signUpRole,
}) => {
  return (
    <div className="clerk-auth-buttons">
      <CustomSignInButton />
      <CustomSignUpButton role={signUpRole} />
    </div>
  );
};

export default AuthButtons;
