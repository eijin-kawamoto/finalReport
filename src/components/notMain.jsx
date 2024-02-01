import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination"; // Import Pagination from MUI
// キャッシュを保存するためのオブジェクト
const pokemonCache = {};
const typeTranslations = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    electric: "でんき",
    grass: "くさ",
    ice: "こおり",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    psychic: "エスパー",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー"
  };
  async function fetchPokemonData(id) {
    if (pokemonCache[id]?.data) {
      return pokemonCache[id].data;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // タイプを日本語に翻訳する
    const translatedTypes = data.types.map((typeEntry) => {
      return typeTranslations[typeEntry.type.name] || typeEntry.type.name;
    });
    const pokemonDataWithTranslatedTypes = {
      ...data,
      types: translatedTypes // 日本語に翻訳されたタイプ
    };
    pokemonCache[id] = { ...(pokemonCache[id] || {}), data: pokemonDataWithTranslatedTypes };
    return pokemonDataWithTranslatedTypes;
  }
async function fetchPokemonName(id) {
  if (pokemonCache[id]?.name) {
    return pokemonCache[id].name;
  }
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const name = data.names.find((n) => n.language.name === "ja").name;
  pokemonCache[id] = { ...(pokemonCache[id] || {}), name };
  return name;
}
async function fetchFlavorText(id) {
  if (pokemonCache[id]?.flavorText) {
    return pokemonCache[id].flavorText;
  }
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const flavorTextEntries = data.flavor_text_entries.filter((entry) => entry.language.name === "ja");
  const selectedFlavorText = flavorTextEntries.find((entry) => entry.version.name === "sword") || flavorTextEntries[0];
  const flavorText = selectedFlavorText.flavor_text;
  pokemonCache[id] = { ...(pokemonCache[id] || {}), flavorText };
  return flavorText;
}
async function fetchPokemonGenera(id) {
  if (pokemonCache[id]?.genera) {
    return pokemonCache[id].genera;
  }
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const genera = data.genera.find((v) => v.language.name === "ja")?.genus || "";
  pokemonCache[id] = { ...(pokemonCache[id] || {}), genera };
  return genera;
}
export default function Pokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // 追加
    const [paginationRange, setPaginationRange] = useState({ start: 1, end: 10 });
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [flavorText, setFlavorText] = useState("");
    const [genera, setGenera] = useState("");
    const [types, setTypes] = useState(""); // 追加
    const maxPage = 84;
    const [loading, setLoading] = useState(false); // ローディング状態の管理
    const [searchTerm, setSearchTerm] = useState(""); // 検索語の状態
    const displayPokemonDetails = () => {
      return (
          <div>
              <h2>No.{selectedPokemon.id} {selectedPokemon.japaneseName || selectedPokemon.name}</h2>
              <img
                        src={
                            selectedPokemon.sprites.other[
                                "official-artwork"
                            ].front_default
                        }
                        alt={`pokemon-${selectedPokemon.id}`}
                        width="200"
                        height="200"
                    />
              <img
                  src={selectedPokemon.sprites.front_default}
                  alt={selectedPokemon.japaneseName || selectedPokemon.name}
              />
              <p>タイプ: {selectedPokemon.types.join(',')}</p>
              <p>身長: {selectedPokemon.height / 10} m</p>
              <p>重さ: {selectedPokemon.weight / 10} kg</p>
              <p>{flavorText}</p>
          </div>
      );
  };
    // ポケモン検索関数
  const searchPokemon = async () => {
    if (!searchTerm) return; // 検索語がない場合は何もしない
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('ポケモンが見つかりませんでした');
      }
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchTotalCount = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon`;
      const res = await fetch(url);
      const data = await res.json();
      return data.count;
    };
    fetchTotalCount().then((totalCount) => {
      const totalPages = Math.ceil(totalCount / 12);
      setTotalPages(totalPages); // ページ数をセット
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const pokemonIds = Array.from({ length: 12 }, (_, i) => i + 1 + (currentPage - 1) * 12);
      const pokemonDataPromises = pokemonIds.map((id) => fetchPokemonData(id));
      const pokemonNamePromises = pokemonIds.map((id) => fetchPokemonName(id));
      const pokemonDataResults = await Promise.all(pokemonDataPromises);
      const pokemonNameResults = await Promise.all(pokemonNamePromises);
      const combinedData = pokemonDataResults.map((data, index) => ({
        ...data,
        japaneseName: pokemonNameResults[index],
      }));
      setPokemons(combinedData);
    };
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    if (currentPage === paginationRange.end && currentPage < maxPage) {
      setPaginationRange({ start: currentPage, end: Math.min(currentPage + 10, maxPage) });
    }
  }, [currentPage, paginationRange]);
  const handlePokemonClick = async (pokemon) => {
    setSelectedPokemon(pokemon);
    const text = await fetchFlavorText(pokemon.id);
    setFlavorText(text);
    const generaText = await fetchPokemonGenera(pokemon.id);
    setGenera(generaText);
    const typesText = pokemon.types.join(","); // タイプの配列を文字列に変換
    setTypes(typesText); // ステートにセット
  };
  useEffect(() => {
    // その他の useEffect ロジックは変更なし
    // ページが最大値を超えないようにする
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPage]);
  const closeModal = () => {
    setSelectedPokemon(null);
    setFlavorText(""); // モーダルが閉じられたときに紹介文をクリア
    setGenera(""); // モーダルが閉じられたときに分類をクリア
  };
  return (
    <div style={styles.divStyle}>
        <Grid container spacing={2}>
            {pokemons.map((pokemon, index) => (
                <Grid item key={index} xs={2} sm={2} md={2} lg={2}>
                    <ImageList sx={{ width: 370, height: 250 }}>
                        <ImageListItem
                            key={pokemon.id}
                            onClick={() => handlePokemonClick(pokemon)}
                        >
                            <img
                                src={
                                    pokemon.sprites.other["official-artwork"].front_default
                                }
                                className="Pokemon-img"
                                alt={`pokemon-${index}`}
                                width="150"
                                height="150"
                            />
                            <ImageListItemBar
                                title={<span>{pokemon.japaneseName}</span>}
                                subtitle={`No.${pokemon.id}`}
                                position="below"
                            />
                        </ImageListItem>
                    </ImageList>
                </Grid>
            ))}
        </Grid>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
                count={paginationRange.end}
                color="primary"
                onChange={(e, page) => setCurrentPage(page)}
                page={currentPage}
            />
        </div>
        {/* 検索フォーム */}
        <input
            type="text"
            placeholder="ポケモン名を入力"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchPokemon}>検索</button>
        {/* ローディングと検索結果の表示 */}
        {loading && <p>読み込み中...</p>}
        {selectedPokemon && (
            <div
                style={styles.modalBackdropStyle}
                onClick={closeModal}
            >
                <div
                    style={styles.modalContentStyle}
                    onClick={(e) => e.stopPropagation()}
                >
                    {selectedPokemon && displayPokemonDetails()}
                    <button onClick={closeModal}>戻る</button>
                </div>
            </div>
        )}
    </div>
);
}
const styles = {
divStyle: {
    textAlign: "center",
    margin: "100px",
    padding: "0 10px",
},
modalBackdropStyle: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
},
modalContentStyle: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
},
};