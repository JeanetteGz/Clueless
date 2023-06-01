import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const ClothesForm = () => {
    const [name, setName]= useState('');
    const [picture, setPicture]= useState('');
    const [color, setColor]= useState('');
    const [type, setType]= useState('');
    const [binId, setBinId]= useState('');
    const [tagId, setTagId]= useState([]);
    const [bins, setBins] = useState([]);
    const [tags, setTags] = useState([]);
    const { token } = useToken();

    const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    }
    const handlePictureChange = (event) => {
      const value = event.target.value;
      setPicture(value);
    }
    const handleColorChange = (event) => {
      const value = event.target.value;
      setColor(value);
    }
    const handleTypeChange = (event) => {
      const value = event.target.value;
      setType(value);
    }
    const handleBinIdChange = (event) => {
      const value = event.target.value;
      setBinId(value);
    }
    const handleTagIdChange = (event) => {
      const value = event.target.value;
      setTagId( tagId => [...tagId, value]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture = picture;
        data.primary_color = color;
        data.type = type;
        data.tag_ids = tagId;
        data.bin_id = binId;
        data.closet_id = "646b99c3f2cd73044cf5707d";

        const response = await fetch(`${process.env.REACT_APP_WHATEVR}/api/closet/${data.closet_id}/bins/${data.bin_id}/clothes`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            setName('');
            setPicture('');
            setColor('');
            setType('');
            setBinId('');
            setTagId([]);
        } else {
          const error = await response.json();
          console.log("Error", error);
        }
    };

    const loadBins = async () => {
        const url = `${process.env.REACT_APP_WHATEVR}/api/closet/646b99c3f2cd73044cf5707d/bins/`;
        const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
        const data = await response.json();
        setBins(data.bins);
        }
    };

    const loadTags = async () => {
        const url=`${process.env.REACT_APP_WHATEVR}/api/tags`;
        const fetchConfig = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
        const data = await response.json();
        setTags(data.tags);
        }
    };

    useEffect(() => {loadBins(); loadTags();}, [token]);


return (
  <div className="card text-bg-light mb-3">
    <h5 className="card-header">ClothingForm</h5>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="picture">Picture</label>
          <input
            type="text"
            name="picture"
            id="picture"
            value={picture}
            onChange={handlePictureChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="primary_color">Primary Color</label>
          <input
            type="text"
            name="primary_color"
            id="primary_color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            name="type"
            id="type"
            value={type}
            onChange={handleTypeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bin_id">Bins</label>
          <select
            name="bin_id"
            value={binId}
            onChange={handleBinIdChange}
          >
            <option value="">Choose a Bin</option>
            {bins.map((bin) => {
              return (
                <option value={bin.id} key={bin.id}>
                  {bin.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tag_ids">Tags</label>
          <select
            name="tag_ids"
            value={tagId}
            onChange={handleTagIdChange}
          >
            <option value="">Tag</option>
            {tags.map((tag) => {
              return (
                <option value={tag.id} key={tag.id}>
                  {tag.description}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  </div>
);
};

export default ClothesForm;