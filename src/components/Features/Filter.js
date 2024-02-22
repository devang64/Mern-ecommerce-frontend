import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Slider, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Filter.css';

const Filter = ({ applyFilter }) => {
    const categories = ["speakers", "neckbends", "headphone", "smartwatch", "earbuds" ,"gamingheadphone"];
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');

    const handleApplyFilter = () => {
        // Pass the filter values to the parent component (Products) via the applyFilter callback
        applyFilter({ price, category });
    };

    const handleClearFilter = () => {
        setCategory('');
        setPrice([0, 50000]);
        applyFilter({});
    };

    return (
        <div className='product-filter'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="price-range-content"
                    id="price-range-header"
                >
                    <Typography variant="subtitle1">Filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="price-range-content"
                            id="price-range-header"
                        >
                            <Typography variant="subtitle1">PRICE</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <Box className="price-filter" >
                                    <Slider
                                        value={price}
                                        onChange={(e, newValue) => setPrice(newValue)}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        min={0}
                                        max={25000}
                                    />
                                </Box>
                            </div>
                            <div>
                                <label>
                                    Price Range: ₹{price[0]} - ₹{price[1]}
                                </label>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="category-content"
                            id="category-header"
                        >
                            <Typography variant="subtitle1">CATEGORIES</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div >
                                {categories.map((cat) => (
                                    <a>
                                    <li
                                        className={'filter-category-list'}
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                    >
                                        {cat}
                                    </li>
                                    </a>
                                    
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className='button-div'>
                        <button onClick={handleApplyFilter}>Apply</button>
                        <button onClick={handleClearFilter}>Reset</button>
                    </div>
                </AccordionDetails>
            </Accordion>


        </div>
    );
}

export default Filter;
