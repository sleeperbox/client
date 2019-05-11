import React from "react";
import { Card, CardHeader, CardContent, CardMeta, Image, Divider, Container } from "semantic-ui-react";

  const marginText = {
    marginBottom: 75
  }

  const News = (props) => {
    const datas = props.newsContent
    return (
      <div style={marginText}>
       {datas.map((data, i) => {
        return (
        <div style={{marginTop: 15, padding: 2, margin: 1}} key={i}>
          <Card centered fluid style={{padding: 5, margin: 2}}>
          <a href={data.url}><CardHeader>{JSON.stringify(data.title).slice(1, -1)}</CardHeader></a>
            <Divider hidden style={{marginTop: -1}}/>
            {data.urlToImage == null ? <p>no image</p> : (
              <Image src={data.urlToImage} />
            )}
            <Divider hidden style={{marginTop: -1}}/>
            <CardMeta style={{textAlign: "center"}}>{JSON.stringify(data.author)}</CardMeta>
            <CardContent style={{fontSize: 12}}>{JSON.stringify(data.description)}</CardContent>
          </Card>
        </div>
        )
       })}
      </div>
    )
  }

  export default News
