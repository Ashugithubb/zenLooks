"use client";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import style from "./navbar.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { clearUser } from "@/app/redux/slice/login.slice";
import { toast, ToastContainer } from "react-toastify";
import { logoutUser } from "@/app/redux/thunk/auth/login.thunk";

export default function Navbar() {
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.login) ?? "";
  const token = useAppSelector((state) => state.login.auth?.token);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
    setOpen(false);
  };

  const handleLogout = () => {
    try {
      dispatch(clearUser());
      dispatch(logoutUser());
      toast("Logged out successfully");
      router.push("/");
      setOpen(false);
    } catch (error) {
      toast.error("Unable to log out");
    }
  };

  return (
    <>

      <Box
        className={style.navbar}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4, md: 8 },
          py: 2,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          backgroundColor: "black",
          zIndex: 10000000,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className={style.logo}
          style={{
            fontWeight: 700,
            fontSize: "1.6rem",
            color: "#1a1a1a",
            textDecoration: "none",
          }}
        >
          ZenLook
        </Link>

        {/* Desktop Links */}
        <Box
          className={style.right}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <Link href="/" className={style.link}>
            Home
          </Link>
          <Link href="/#about" className={style.link}>
            About
          </Link>
          <Link href="/#footer" className={style.link}>
            Contact
          </Link>
          <Link href="/services" className={style.link}>
            Services
          </Link>

          {!token ? (
            <Button
              onClick={handleLogin}
              variant="contained"
              className={style.loginBtn}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="contained"
              className={style.loginBtn}
            >
              Log out
            </Button>
          )}
        </Box>


        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setOpen(!open)}
        >
         <IconButton
  onClick={() => setOpen(!open)}
  sx={{
    display: { xs: "block", md: "none" },
    position: "fixed",
    top: 3,
    right: open ? "10px" : "20px", // when open, move it 45px out
    transition: "right 0.3s ease",
    zIndex: 2000,
  }}
>
  {!open ? (
    <MenuIcon sx={{ color: "white", fontSize: 28 }} />
  ) : (
    <CloseIcon sx={{ color: "white", fontSize: 30 }} />
  )}
</IconButton>


        </IconButton>
      </Box>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            backgroundColor: "black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontFamily: "'Playfair Display', serif" }}
            >
              ZenLook
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Link href="/" className={style.link} onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link
            href="/#about"
            className={style.link}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/#footer"
            className={style.link}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/services"
            className={style.link}
            onClick={() => setOpen(false)}
          >
            Services
          </Link>

          {!token ? (
            <Button
              onClick={handleLogin}
              variant="contained"
              className={style.loginBtn}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              variant="contained"
              className={style.loginBtn}
              sx={{ mt: 2 }}
            >
              Log out
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}
