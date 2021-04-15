import "./css/ContentNewsListEntry.css"

interface Props {
  newsTitle: string,
  newsLink: string,
  newsDesc: string,
  key: string
}

function ContentNewsListEntry(props: Props) {

  const handleNewsClick = () => {
    window.open(props.newsLink)
  }

  const filterNews = function(news: string){
    let filteredOne = news.replaceAll('<b>', "")
    let filteredTwo = filteredOne.replaceAll('</b>', "")
    return filteredTwo.replaceAll("&quot;", "")
  }

  return (
  <div id="contentNewsListEntryContainer" className="shadow" onClick={handleNewsClick}>
    <div id="contentNewsTitle">{filterNews(props.newsTitle)}</div>
    <p id="contentNewsDescription">{filterNews(props.newsDesc)}</p>
  </div>
  )
}

export default ContentNewsListEntry