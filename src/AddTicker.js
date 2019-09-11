import React, { useState } from "react";
import { TextField, Button, Modal, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexFlow: "column",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function AddTickers(props) {
  const { data, addTicker } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    addTicker([...data, { name: value }]);
    setOpen(false);
  }

  return (
    <div className="add-ticker">
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={"pitcher modal"}
      >
        <div className={classes.paper}>
          <TextField
            value={value}
            id="stock-ticker"
            label={"Stock Ticker"}
            className="stock-ticker"
            onChange={handleChange}
            type="text"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className="submit button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
      <Button onClick={handleOpen}> + Add Ticker </Button>
    </div>
  );
}

export default AddTickers;
