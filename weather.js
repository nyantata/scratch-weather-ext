class WeatherExtension {
  getInfo() {
    return {
      id: 'weatherExt',
      name: '天気情報',
      blocks: [
        {
          opcode: 'getTemperature',
          blockType: Scratch.BlockType.REPORTER,
          text: '緯度 [lat] 経度 [lon] の気温',
          arguments: {
            lat: { type: Scratch.ArgumentType.NUMBER, defaultValue: 35.68 },
            lon: { type: Scratch.ArgumentType.NUMBER, defaultValue: 139.76 }
          }
        },
        {
          opcode: 'getWeather',
          blockType: Scratch.BlockType.REPORTER,
          text: '緯度 [lat] 経度 [lon] の天気',
          arguments: {
            lat: { type: Scratch.ArgumentType.NUMBER, defaultValue: 35.68 },
            lon: { type: Scratch.ArgumentType.NUMBER, defaultValue: 139.76 }
          }
        }
      ]
    };
  }

  async fetchData(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    return await response.json();
  }

  async getTemperature(args) {
    const data = await this.fetchData(args.lat, args.lon);
    return `${data.current_weather.temperature}℃`;
  }

  async getWeather(args) {
    const data = await this.fetchData(args.lat, args.lon);
    const code = data.current_weather.weathercode;

    const weatherMap = {
      0: "快晴",
      1: "晴れ",
      2: "一部曇り",
      3: "曇り",
      45: "霧",
      48: "霧氷を伴う霧",
      51: "小雨",
      53: "にわか雨",
      55: "強い雨",
      61: "小雪",
      63: "雪",
      65: "強い雪",
      80: "にわか雨",
      81: "激しい雨",
      82: "非常に激しい雨"
    };

    return weatherMap[code] || `不明(${code})`;
  }
}

Scratch.extensions.register(new WeatherExtension());
