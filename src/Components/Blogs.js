import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import {
  Stack,
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  ButtonBase,
} from "@mui/material";
import styled from "@emotion/styled";
import { purple } from "@mui/material/colors";

const url = "https://jsonmockserver.vercel.app/api/blogs";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const TypographyCards = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  variant: 'body1'
});
const ButtonBaseCustom = styled(ButtonBase)({
  '&:hover': {
    backgroundColor: '#96E2F4',
    boxShadow: 'none',
  },
});
function Blogs() {
  const [regional, setRegional] = useState([]);
  const [national, setNational] = useState([]);
  const [international, setInternational] = useState([]);
  const [isRegional, setIsRegional] = useState(true);
  const [isNational, setIsNational] = useState(true);
  const [isInternational, setIsInternational] = useState(true);
  const [article, setArticle] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedID, setSelectedID] = useState('');



  useEffect(() => {
    axios.get(url).then((response) => {
      let reg = [],
        nation = [],
        inter = [];
      if (response.data !== undefined && response.data !== null) {
        response.data.map((data) => {
          if (data.type === "Regional") {
            reg.push(data);
          } else if (data.type === "National") {
            nation.push(data);
          } else if (data.type === "International") {
            inter.push(data);
          }
        });
        let [first] = [...reg, ...nation, ...inter];
        setRegional(reg);
        setNational(nation);
        setInternational(inter);
        setArticle(first)
      }
    });
  }, []);

  const handleArticleClick = (blog, id) => {
    setArticle(blog);
    setSelectedID(id);
  }

  const searchBlogs = () => {
    if (searchText !== '') {
      setIsRegional(false);
      setIsNational(false);
      setIsInternational(false);
      let arr = [...regional, ...national, ...international];
      let results = arr.filter(val => val.title.toLowerCase().includes(searchText.toLowerCase()) ||
        val.details.toLowerCase().includes(searchText.toLowerCase()))
      setSearchFlag(true);
      setSearchResult(results);
    }
  }

  const handleChange = (param) => {
    if (param === "Regional") {
      setIsRegional(!isRegional);
    } else if (param === "National") {
      setIsNational(!isNational);
    } else if (param === "International") {
      setIsInternational(!isInternational);
    }
  };


  return (
    <Box bgcolor="#FFFFFF" width="100%">
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: '15%' }}>
          <Box sx={{ margin: 'auto', position: 'fixed' }}>
            <Stack justifyContent='center'>
              <img className="logo" src={logo} alt="Little Book" />
              <Box sx={{ display: 'flex', flexDirection: 'column' }} className="checkBoxes">
                <FormControl sx={{ m: 'auto' }} component="fieldset" variant="standard">
                  <FormLabel sx={{ fontWeight: 'bold', color: "#000000" }}>FILTER</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="Regional"
                          onChange={() => handleChange("Regional")}
                          defaultChecked
                          color="secondary"
                        />
                      }
                      label="Regional Blogs"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="National"
                          onChange={() => handleChange("National")}
                          defaultChecked
                          color="secondary"
                        />
                      }
                      label="National Blogs"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="International"
                          onChange={() => handleChange("International")}
                          defaultChecked
                          color="secondary"
                        />
                      }
                      label="International Blogs"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box bgcolor="#F5F6FA" width="35%" className="cards">
          <Box sx={{ borderRadius: 3, margin: 3 }}>
            <input type="text" placeholder="Search Blogs" className="inputField" onChange={e => {
              setSearchText(e.target.value);
              if (e.target.value === '') {
                setIsRegional(true);
                setIsNational(true);
                setIsInternational(true);
              }
            }} />
            <button type="button" className="btn" onClick={searchBlogs}>SEARCH</button>
            {isRegional
              ? regional.map((blog, id) => {
                return (
                  <Card sx={{ maxWidth: 400, borderRadius: 3, margin: 3 }} key={"Regional_" + id} className={"Regional_" + id === selectedID ? "cardActive" : "cardInActive"} >
                    <ButtonBaseCustom onClick={() => handleArticleClick(blog, "Regional_" + id)}>
                      <CardContent>
                        <Typography variant='h6' component='div'>{blog.title} </Typography>
                        <Typography variant='subtitle2' color="secondary" textTransform='uppercase' gutterBottom>{blog.type} </Typography>
                        <TypographyCards>
                          {blog.details}
                        </TypographyCards>
                      </CardContent>
                    </ButtonBaseCustom>
                  </Card>
                );
              })
              : null}
            {isNational
              ? national.map((blog, id) => {
                return (
                  <Card sx={{ maxWidth: 400, borderRadius: 3, margin: 3 }} key={"National_" + id} className={"National_" + id === selectedID ? "cardActive" : "cardInActive"}>
                    <ButtonBaseCustom onClick={() => handleArticleClick(blog, "National_" + id)}>
                      <CardContent>
                        <Typography variant='h6' component='div'>{blog.title} </Typography>
                        <Typography variant='subtitle2' color="secondary" textTransform='uppercase' gutterBottom>{blog.type} </Typography>
                        <TypographyCards>
                          {blog.details}
                        </TypographyCards>
                      </CardContent>
                    </ButtonBaseCustom>
                  </Card>
                );
              })
              : null}
            {isInternational
              ? international.map((blog, id) => {
                return (
                  <Card sx={{ maxWidth: 400, borderRadius: 3, margin: 3 }} key={"International_" + id} className={"International_" + id === selectedID ? "cardActive" : "cardInActive"} >
                    <ButtonBaseCustom onClick={() => handleArticleClick(blog, "International_" + id)}>
                      <CardContent>
                        <Typography variant='h6' component='div'>{blog.title} </Typography>
                        <Typography variant='subtitle2' color="secondary" textTransform='uppercase' gutterBottom>{blog.type} </Typography>
                        <TypographyCards>
                          {blog.details}
                        </TypographyCards>
                      </CardContent>

                    </ButtonBaseCustom>
                  </Card>
                );
              })
              : null}
            {searchFlag
              ? searchResult.map((blog) => {
                return (
                  <Card sx={{ maxWidth: 400, borderRadius: 3, margin: 3 }} key={blog.title}>
                    <ButtonBaseCustom onClick={() => handleArticleClick(blog)}>
                      <CardContent >
                        <Typography variant='h6' component='div'>{blog.title} </Typography>
                        <Typography variant='subtitle2' color="secondary" textTransform='uppercase' gutterBottom>{blog.type} </Typography>
                        <TypographyCards>
                          {blog.details}
                        </TypographyCards>
                      </CardContent>
                    </ButtonBaseCustom>
                  </Card>
                );
              })
              : null}
          </Box>
        </Box>
        <Box width="50%">
          <Box sx={{ display: 'flex', flexDirection: 'column', m: 'auto', width: '95%', p: 3 }}>
            <Box className="article">
              <img className="banner" src={article.photo} alt="photo" />
              <Typography variant='h4' component='div' mb={2}>{article.title} </Typography>
              <Typography variant="body1" textAlign="justify">
                {article.details}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Blogs;
