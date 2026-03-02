export interface SurahList {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: Record<string, string>;
}

export interface Ayah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>;
}

export interface SurahDetail extends SurahList {
  ayat: Ayah[];
  suratSelanjutnya: { nomor: number; nama: string; namaLatin: string } | false;
  suratSebelumnya: { nomor: number; nama: string; namaLatin: string } | false;
}

export async function getSurahs(): Promise<SurahList[]> {
  const res = await fetch("https://equran.id/api/v2/surat");
  if (!res.ok) throw new Error("Failed to fetch surahs");
  const data = await res.json();
  return data.data;
}

export async function getSurah(nomor: number): Promise<SurahDetail> {
  const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
  if (!res.ok) throw new Error("Failed to fetch surah detail");
  const data = await res.json();
  return data.data;
}
