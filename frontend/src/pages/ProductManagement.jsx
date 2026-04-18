import React, { useState } from 'react';
import { Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Grid, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const sizesList = ["Xs", "S", "M", "L", "xL", "2xl", "3xl", "4xl", "5xl"];

const categories = {
  "Casual wear (Women)": ["Frocks", "Tops / Crop tops", "Skirts", "Pants / Trousers", "Denims"],
  "Casual wear (Men)": ["Shirts", "T-shirts", "Denims"],
  "Office wear": ["Frocks", "Blouse", "Pants"],
  "Footwear": ["General"],
  "Accessories (Women)": ["Jewelry", "Hand bags", "Hair accessories"],
  "Kids wear": ["General"],
  "Gift items": ["General"],
  "New arrivals": ["General"]
};

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: '1', name: 'Elegant Office Frock', price: 3500, category: 'Office wear', subCategory: 'Frocks', stock: 50 },
    { id: '2', name: 'Casual Floral Dress', price: 2800, category: 'Casual wear (Women)', subCategory: 'Frocks', stock: 30 }
  ]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');

  const handleOpen = (product = null) => {
    const p = product || { name: '', price: 0, category: '', subCategory: '', description: '', weight: 0.5, sizes: sizesList.map(s => ({ size: s, imageUrl: '', stock: 0 })) };
    setEditingProduct(p);
    setSelectedCat(p.category);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">Product Management</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Product
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub-Category</TableCell>
              <TableCell>Price (LKR)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subCategory}</TableCell>
                <TableCell>{product.price.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(product)} color="primary"><EditIcon /></IconButton>
                  <IconButton color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent className="pt-4">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Product Name" defaultValue={editingProduct?.name} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Price (LKR)" type="number" defaultValue={editingProduct?.price} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                margin="normal"
              >
                {Object.keys(categories).map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Sub-Category" defaultValue={editingProduct?.subCategory} margin="normal">
                {selectedCat && categories[selectedCat].map(sub => (
                  <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Weight (kg)" type="number" defaultValue={editingProduct?.weight} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} defaultValue={editingProduct?.description} margin="normal" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" className="mt-4 mb-2 font-bold">Size-wise Inventory & Images</Typography>
              <div className="grid grid-cols-1 gap-4">
                {sizesList.map((size) => (
                  <div key={size} className="flex space-x-2 items-center border-b pb-2">
                    <Typography className="w-8 font-bold">{size}</Typography>
                    <TextField label="Image URL" fullWidth size="small" />
                    <TextField label="Stock" type="number" size="small" sx={{ width: 100 }} />
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <Box className="mt-6 flex justify-end space-x-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleClose}>Save Product</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
