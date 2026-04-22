import React from 'react';
import { Typography, Container, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // Use as TikTok placeholder

const Footer = () => {
  return (
    <footer className="bg-sannaliya-gray text-white py-20 mt-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-teal-gradient"></div>
      <Container>
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" className="font-serif font-bold mb-6 text-sannaliya-teal">Sannaliya</Typography>
            <Typography variant="body1" className="opacity-70 leading-relaxed max-w-sm">
              Sri Lanka's leading boutique for elegant casual and office wear. We blend traditional craftsmanship with contemporary style to make you look your best every single day.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">Quick Links</Typography>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-sannaliya-teal">About Us</a></li>
              <li><a href="#" className="hover:text-sannaliya-teal">Contact Us</a></li>
              <li><a href="#" className="hover:text-sannaliya-teal">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-sannaliya-teal">Privacy Policy</a></li>
            </ul>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-6">Stay Connected</Typography>
            <div className="flex space-x-4 mb-8">
              <IconButton
                className="bg-white/10 hover:bg-sannaliya-teal transition-all"
                color="inherit" component="a" href="https://www.facebook.com/share/17DT4BR7pt/?mibextid=wwXIfr" target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                className="bg-white/10 hover:bg-sannaliya-teal transition-all"
                color="inherit" component="a" href="https://www.instagram.com/sannaliya_?igsh=MWJ3b201cGU0emM3Nw%3D%3D&utm_source=qr" target="_blank"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                className="bg-white/10 hover:bg-sannaliya-teal transition-all"
                color="inherit" component="a" href="https://www.tiktok.com/@sannaliya?_r=1&_t=ZS-95a5OdBFuce" target="_blank"
              >
                <MusicNoteIcon />
              </IconButton>
              <IconButton
                className="bg-white/10 hover:bg-sannaliya-teal transition-all"
                color="inherit" component="a" href="https://wa.me/94771115024" target="_blank"
              >
                <WhatsAppIcon />
              </IconButton>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
                <Typography variant="body2" className="opacity-60 mb-1">Direct Assistance</Typography>
                <Typography variant="h6" className="text-sannaliya-mint">(+94) 77 1115 024</Typography>
            </div>
          </Grid>
        </Grid>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Sannaliya. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
