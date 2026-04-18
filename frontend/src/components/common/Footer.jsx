import React from 'react';
import { Typography, Container, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // Use as TikTok placeholder

const Footer = () => {
  return (
    <footer className="bg-sannaliya-dark text-white py-8 mt-auto">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">Sannaliya</Typography>
            <Typography variant="body2">
              Your premium destination for fashion in Sri Lanka.
              Quality and elegance in every stitch.
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
            <Typography variant="h6" className="font-bold mb-4">Follow Us</Typography>
            <div className="flex space-x-2">
              <IconButton color="inherit" component="a" href="https://www.facebook.com/share/17DT4BR7pt/?mibextid=wwXIfr" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://www.instagram.com/sannaliya_?igsh=MWJ3b201cGU0emM3Nw%3D%3D&utm_source=qr" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://www.tiktok.com/@sannaliya?_r=1&_t=ZS-95a5OdBFuce" target="_blank">
                <MusicNoteIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://wa.me/94771115024" target="_blank">
                <WhatsAppIcon />
              </IconButton>
            </div>
            <Typography variant="body2" className="mt-4">
              WhatsApp: (+94) 77 1115 024
            </Typography>
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
