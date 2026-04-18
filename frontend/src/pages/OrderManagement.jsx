import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Select, MenuItem, IconButton, Collapse, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { toast } from 'react-toastify';

const Row = (props) => {
  const { row, onStatusChange } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>LKR {row.total.toLocaleString()}</TableCell>
        <TableCell>
          <Select
            value={row.status}
            onChange={(e) => onStatusChange(row.id, e.target.value)}
            size="small"
            className="min-w-[120px]"
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="CONFIRMED">Confirmed</MenuItem>
            <MenuItem value="SHIPPED">Shipped</MenuItem>
            <MenuItem value="DELIVERED">Delivered</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">Order Details</Typography>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Typography variant="subtitle2" className="font-bold">Shipping Address:</Typography>
                  <Typography variant="body2">{row.address}, {row.city}, {row.district}</Typography>
                  <Typography variant="subtitle2" className="font-bold mt-2">Contact:</Typography>
                  <Typography variant="body2">{row.phone1} {row.phone2 && `/ ${row.phone2}`}</Typography>
                </div>
              </div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={`${item.id}-${item.size}`}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">LKR {item.price.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Kamal Perera',
      date: '2026-04-17',
      total: 3950,
      status: 'PENDING',
      address: 'No 123, Main Road',
      city: 'Piliyandala',
      district: 'Colombo',
      phone1: '0771234567',
      items: [{ id: '1', name: 'Elegant Office Frock', size: 'M', quantity: 1, price: 3500 }]
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.info(`Order ${id} status updated to ${newStatus}`);
  };

  return (
    <div>
      <Typography variant="h5" className="mb-6">Order Management</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <Row key={order.id} row={order} onStatusChange={handleStatusChange} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderManagement;
