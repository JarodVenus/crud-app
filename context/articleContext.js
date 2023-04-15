import {createContext, useState} from "react"

export const ArticleContext = createContext();

export function ArticleContextProvider(props){

    const [ articleModif , setArticleModif ] = useState({titre : "", contenu : "" , id : 0})

    function modifier(article){
        setArticleModif(article)
    }

    function viderArticle(){
        setArticleModif({titre : "", contenu : "" , id : 0})
    }


    return <ArticleContext.Provider value={{modifier , articleModif , viderArticle}}>
        {props.children}
    </ArticleContext.Provider>

}