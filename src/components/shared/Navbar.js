import React from "react";
import {
  useTheme,
  useMediaQuery,
  Slide,
  Grid,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  Divider,
  Box,
  MenuItem,
  Drawer,
  Heading,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CloseIcon from "@mui/icons-material/Close";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import "../../styles/Navbar.css";

export default function Header() {
  const [top, setTop] = React.useState(true);
  const [cart, setCart] = React.useState(false);
  const navigate = useNavigate();

  // scroll animation
  const trigger = useScrollTrigger();

  // Theme
  const theme = useTheme();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  const LG = useMediaQuery(theme.breakpoints.down("lg"));
  const current = localStorage.getItem("current");

  React.useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        setTop(true);
      } else if (window.pageYOffset !== 0 && top) {
        setTop(false);
      }
    };
  }, [top]);

  const webList = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "SERVICES",
      link: "/services",
    },
    {
      name: "CONTACT-US",
      link: "/contact-us",
    },
    {
      name: "cart",
      link: "/cart",
    },
    {
      name: "profile",
      dir: [
        {
          name: "SIGN IN",
          link: "/sign-in",
        },
        {
          name: "CREATE ACCOUNT",
          link: "/sign-up",
        },
        {
          name: "BOOKINGS",
          link: "/bookings",
        },
        {
          name: "MY ACCOUNT",
          link: "/profile",
        },
      ],
    },
  ];

  const toggleDrawer = (open) => (event) => {
    setCart(open);
  };

  const cur = localStorage.getItem("current");

  return (
    <React.Fragment>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "#080808",
            boxShadow: "unset",
            paddingTop: MD ? "20px" : "15px",
            paddingBottom: MD ? "20px" : "15px",
          }}
        >
          <Toolbar
            style={{
              alignItems: "center",
              minHeight: "unset",
              justifyContent: "space-between",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            <Grid
              container
              width={"unset"}
              alignItems={"center"}
              gap={"12px"}
              mr={"40px"}
              ml={"10px"}
              height={"30px"}
            >
              <div
                className="blip-connect"
                onClick={() => {
                  navigate("/");
                }}
              >
                Blip Connect
              </div>
            </Grid>
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                height: "20px",
              }}
              gap={LG ? 0.4 : 2}
            >
              <Drawer
                anchor={"right"}
                open={cart}
                onClose={toggleDrawer}
                PaperProps={{
                  sx: {
                    backgroundColor: "rgba(213, 201, 187, 1)",
                    color: "black",
                  },
                }}
              >
                <Grid width={MD ? "40vw" : "30vw"}>
                  <Grid
                    container
                    pt={"9px"}
                    pl={"20px"}
                    pr={"20px"}
                    pb={"9px"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    backgroundColor={"#080808"}
                  >
                    <div style={{ display: "flex", color: "white" }}>
                      <ProductionQuantityLimitsIcon
                        style={{ marginLeft: "10px" }}
                      />
                      Items
                    </div>
                    <Button
                      onClick={toggleDrawer(false)}
                      sx={{
                        color: "primary.contrastText",
                        minWidth: "unset",
                        padding: "unset",
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </Grid>
                  <Grid>WTF!</Grid>
                </Grid>
              </Drawer>
              {webList.map((item, i) => {
                return (
                  <>
                    {item.link && item.name !== "cart" && (
                      <Grid>
                        <NavbarButton
                          name={item.name}
                          handleClick={() => {
                            localStorage.setItem("current", i);
                            navigate(item.link);
                          }}
                          index={i}
                        />
                      </Grid>
                    )}
                    {item.name === "cart" && (
                      <Grid>
                        <NavbarButton
                          name={item.name}
                          cur={cur}
                          index={i}
                          icon={<ShoppingCartIcon />}
                          handleClick={() => setCart(true)}
                        />
                      </Grid>
                    )}
                    {item.dir && <DropView item={item} index={i} />}
                    {i === 2 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          borderRightWidth: 1.2,
                          borderColor: "white",
                        }}
                      />
                    )}
                  </>
                );
              })}
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
    </React.Fragment>
  );
}

export function NavbarButton({ name, handleClick, icon, index }) {
  const theme = useTheme();
  const location = useLocation();
  const MD = useMediaQuery(theme.breakpoints.down("md"));
  let cur = location.pathname;
  // console.log(cur);
  if (cur === "/") {
    cur = "home";
  } else {
    let words = cur.split("/");
    cur = words[1];
  }
  // console.log(cur);

  return (
    <Button
      onClick={() => handleClick()}
      sx={{
        display: "flex",
        color: cur === name?.toLowerCase() ? "rgba(213, 201, 187, 1)" : "white",
        fontSize: "0.9rem",
        fontWeight: MD ? "200" : "400",
        padding: "7px 5px",
        lineHeight: "unset",
        letterSpacing: 1,
        textAlign: MD ? "start" : "center",
        ":hover": {
          color: "rgba(213, 201, 187, 1)",
        },
      }}
    >
      {name && name.split("-").length === 2
        ? name.split("-")[0] + " " + name.split("-")[1]
        : null}
      {name && name.split("-").length !== 2 ? name : null}
      {icon ? icon : null}
      {cur === index && (
        <Divider
          orientation="horizontal"
          sx={{
            borderBottomWidth: 0.8,
            borderColor: "rgba(213, 201, 187, 1)",
          }}
        ></Divider>
      )}
    </Button>
  );
}

export function DropView({ item, i }) {
  const navigate = useNavigate();

  return (
    <Box
      className="dropdown"
      style={{
        display: "inline-block",
        position: "relative",
      }}
    >
      <NavbarButton icon={<AccountBoxIcon />} index={i} />
      <div className="dropdown-content">
        <Box style={{ height: "10px" }}></Box>
        <Box
          sx={{
            backgroundColor: "#080808",
            color: "#cdcdcd",
            paddingBottom: "6px",
            paddingTop: "6px",
            borderRadius: "4px",
          }}
        >
          {item.dir.map((subItem, index) => {
            return (
              <MenuItem
                onClick={() => navigate(subItem.link)}
                sx={{
                  fontSize: "16px",
                }}
                className="dropdown-list dropdown-list-width"
              >
                {subItem.name}
                {index === 1 && (
                  <Divider
                    orientation="horizontal"
                    sx={{
                      borderColor: "grey",
                    }}
                  />
                )}
              </MenuItem>
            );
          })}
        </Box>
      </div>
    </Box>
  );
}
