import React, { useState, useEffect } from 'react';
import { Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Grid, Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { productApi } from '../services/api';
import { toast } from 'react-toastify';

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCat, setSelectedCat] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    productApi.getAll()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleOpen = (product = null) => {
    const p = product || { name: '', price: 0, category: '', subCategory: '', description: '', weight: 0.5, mainImageUrl: '', sizes: sizesList.map(s => ({ size: s, imageUrl: '', stock: 0 })) };
    setEditingProduct(p);
    setSelectedCat(p.category);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const saveAction = editingProduct.id
      ? productApi.update(editingProduct.id, editingProduct)
      : productApi.create(editingProduct);

    saveAction
      .then(() => {
        toast.success('Product saved successfully');
        handleClose();
        fetchProducts();
      })
      .catch(err => {
        toast.error('Failed to save product');
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productApi.delete(id)
        .then(() => {
          toast.success('Product deleted');
          fetchProducts();
        })
        .catch(err => {
          toast.error('Failed to delete product');
          console.error(err);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">Product Management</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add Product
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><CircularProgress /></div>
      ) : (
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
                    <IconButton onClick={() => handleDelete(product.id)} color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent className="pt-4">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Product Name"
                value={editingProduct?.name || ''}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Price (LKR)" type="number"
                value={editingProduct?.price || ''}
                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Box className="flex items-center space-x-4">
                <TextField
                  fullWidth label="Main Image URL"
                  value={editingProduct?.mainImageUrl || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, mainImageUrl: e.target.value})}
                  margin="normal"
                />
                <Button variant="outlined" component="label">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditingProduct({
                            ...editingProduct,
                            imageData: reader.result,
                            mainImageUrl: file.name
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
              </Box>
              {editingProduct?.imageData && (
                <img src={editingProduct.imageData} alt="Preview" className="mt-2 h-20 w-auto rounded border" />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                value={selectedCat}
                onChange={(e) => {
                  setSelectedCat(e.target.value);
                  setEditingProduct({...editingProduct, category: e.target.value});
                }}
                margin="normal"
              >
                {Object.keys(categories).map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Sub-Category"
                value={editingProduct?.subCategory || ''}
                onChange={(e) => setEditingProduct({...editingProduct, subCategory: e.target.value})}
                margin="normal"
              >
                {selectedCat && categories[selectedCat].map(sub => (
                  <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Weight (kg)" type="number"
                value={editingProduct?.weight || ''}
                onChange={(e) => setEditingProduct({...editingProduct, weight: parseFloat(e.target.value)})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Description" multiline rows={3}
                value={editingProduct?.description || ''}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" className="mt-4 mb-2 font-bold">Size-wise Inventory & Images</Typography>
              <div className="grid grid-cols-1 gap-4">
                {editingProduct?.sizes?.map((sizeObj, idx) => (
                  <div key={idx} className="flex space-x-2 items-center border-b pb-2">
                    <Typography className="w-8 font-bold">{sizeObj.size}</Typography>
                    <TextField
                      label="Image URL" fullWidth size="small"
                      value={sizeObj.imageUrl}
                      onChange={(e) => {
                        const newSizes = [...editingProduct.sizes];
                        newSizes[idx].imageUrl = e.target.value;
                        setEditingProduct({...editingProduct, sizes: newSizes});
                      }}
                    />
                    <TextField
                      label="Stock" type="number" size="small" sx={{ width: 100 }}
                      value={sizeObj.stock}
                      onChange={(e) => {
                        const newSizes = [...editingProduct.sizes];
                        newSizes[idx].stock = parseInt(e.target.value);
                        setEditingProduct({...editingProduct, sizes: newSizes});
                      }}
                    />
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <Box className="mt-6 flex justify-end space-x-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>Save Product</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
