import React from 'react';
import { Typography, Container, Grid, IconButton, Stack, Box, Divider, Link } from '@mui/material';
import {
  Facebook,
  Instagram,
  WhatsApp,
  TheaterComedy, // Using for TikTok
  EmailOutlined,
  PhoneInTalkOutlined,
  LocationOnOutlined,
  ArrowForward
} from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-20 mt-auto relative overflow-hidden">
      <Box className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary-dark" />

      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography variant="h4" className="font-serif font-bold mb-6 text-white tracking-tight">
              Sannaliya
            </Typography>
            <Typography variant="body1" className="text-slate-400 leading-relaxed mb-8">
              Elevating Sri Lankan fashion since 1998. We specialize in premium boutique wear that combines heritage elegance with contemporary functionality.
            </Typography>
            <Stack direction="row" spacing={2}>
              {[
                { icon: <Facebook />, link: "https://www.facebook.com/share/17DT4BR7pt/?mibextid=wwXIfr" },
                { icon: <Instagram />, link: "https://www.instagram.com/sannaliya_?igsh=MWJ3b201cGU0emM3Nw%3D%3D&utm_source=qr" },
                { icon: <TheaterComedy />, link: "https://www.tiktok.com/@sannaliya?_r=1&_t=ZS-95a5OdBFuce" },
                { icon: <WhatsApp />, link: "https://wa.me/94771115024" }
              ].map((social, i) => (
                <IconButton
                  key={i}
                  className="bg-slate-900 text-slate-400 hover:bg-primary hover:text-white transition-all border border-slate-800"
                  component="a"
                  href={social.link}
                  target="_blank"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" className="font-bold mb-6 text-white">Collections</Typography>
            <Stack spacing={2}>
              {["Casual Wear", "Office Wear", "Footwear", "New Arrivals"].map(link => (
                <Link key={link} href="#" underline="none" className="text-slate-500 hover:text-primary transition-colors flex items-center group">
                  <ArrowForward className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  {link}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" className="font-bold mb-6 text-white">Customer Care</Typography>
            <Stack spacing={2}>
              {["Size Guide", "Shipping Policy", "Track Order", "FAQ"].map(link => (
                <Link key={link} href="#" underline="none" className="text-slate-500 hover:text-primary transition-colors flex items-center group">
                  <ArrowForward className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  {link}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" className="font-bold mb-6 text-white">Contact Info</Typography>
            <Stack spacing={3}>
              <Box className="flex items-start space-x-4">
                <LocationOnOutlined className="text-primary mt-1" />
                <Typography variant="body2" className="text-slate-400">
                  123 Boutique Street, <br />
                  Colombo 07, Sri Lanka
                </Typography>
              </Box>
              <Box className="flex items-center space-x-4">
                <PhoneInTalkOutlined className="text-primary" />
                <Typography variant="body2" className="text-slate-400 font-bold">
                  (+94) 77 1115 024
                </Typography>
              </Box>
              <Box className="flex items-center space-x-4">
                <EmailOutlined className="text-primary" />
                <Typography variant="body2" className="text-slate-400">
                  hello@sannaliya.lk
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider className="my-12 border-slate-900" />

        <Box className="flex flex-col md:row justify-between items-center text-sm text-slate-500">
          <Typography>© {new Date().getFullYear()} Sannaliya Boutique. All rights reserved.</Typography>
          <Stack direction="row" spacing={4} className="mt-4 md:mt-0">
            <Link href="#" underline="none" className="text-slate-500 hover:text-white">Privacy Policy</Link>
            <Link href="#" underline="none" className="text-slate-500 hover:text-white">Terms of Service</Link>
          </Stack>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
