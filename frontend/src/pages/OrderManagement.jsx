import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Select, MenuItem, IconButton, Collapse, Box, CircularProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { toast } from 'react-toastify';
import { orderApi } from '../services/api';

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
        <TableCell>{row.firstName} {row.lastName}</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>LKR {row.grandTotal.toLocaleString()}</TableCell>
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
                  <Typography variant="body2">{row.address}, {row.nearestCity}, {row.district}</Typography>
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
                  {row.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.productName}</TableCell>
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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    orderApi.getAll()
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    orderApi.updateStatus(id, newStatus)
      .then(() => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        toast.info(`Order ${id} status updated to ${newStatus}`);
      })
      .catch(err => {
        toast.error('Failed to update status');
        console.error(err);
      });
  };

  return (
    <div>
      <Typography variant="h5" className="mb-6">Order Management</Typography>
      {loading ? (
        <div className="flex justify-center py-10"><CircularProgress /></div>
      ) : (
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
      )}
    </div>
  );
};

export default OrderManagement;
