import { makeAutoObservable } from "mobx"

class CarsMobx {
    carsData = <any[]>[];
    carsBackup = <any[]>[];
    sortingType = <number>0;
    carsFavorite = <any[]>[];
    
    // Вводил дополнительный массив id для отслеживания выбранных избранных машин
    //carsFavoriteIds = <any[]>[];


    constructor() {
        makeAutoObservable(this)
    }

    fillCars(fetchedCars: []) {
        this.carsData = fetchedCars;
        this.carsBackup = fetchedCars;
    }

    findCar(car_name:string) {
        
        this.carsData = this.carsBackup.filter(current_car => 
        {
            const car_full_name = (current_car.brand.toLowerCase() + ' ' + current_car.model.toLowerCase());

            if (car_full_name.includes(car_name)) { 
                
                return current_car;
            
            }
        }
        )
    }

    restoreCars() {
        this.carsData = [...this.carsBackup]
    }

    sortCars(sortingType:number) {

        this.sortingType = sortingType;

        switch(sortingType) {
            case 0: {
                // sortingType: 0 => Сначала в наличии
                
                // Дополнительная сортировка по бренду и модели, чтобы каждый раз при сортировке список не видоизменялся
                this.carsData = this.carsData.sort((a, b) => {
                    if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return -1;
                    if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return 1;
                    return 0;
                });

                this.carsData = this.carsData.sort((a, b) => {
                    if (a.availability && !b.availability) {
                        return -1;
                    }
                    else if (!a.availability && b.availability) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
                
                break;
            }

            case 1: {
                // sortingType: 1 => По имени (A-Z)
                this.carsData = this.carsData.sort((a, b) => {
                        if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return -1;
                        if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return 1;
                        return 0;
                });
                break;
            }

            case 2: {
                // sortingType: 2 => По имени (Z-A)
                this.carsData = this.carsData.sort((a, b) => {
                        if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return 1;
                        if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return -1;
                        return 0;
                });
                break;
            }

            case 3: {
                // sortingType: 3 => Сначала новее
                
                this.carsData = this.carsData.sort((a, b) => {
                    if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return -1;
                    if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return 1;
                    return 0;
                });

                this.carsData = this.carsData.sort((a, b) => b.model_year - a.model_year);
                break;
            }

            case 4: {
                // sortingType: 4 => Сначала старше

                this.carsData = this.carsData.sort((a, b) => {
                    if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return -1;
                    if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return 1;
                    return 0;
                });

                this.carsData = this.carsData.sort((a, b) => a.model_year - b.model_year);
                break;
            }

            case 5: {
                // sortingType: 5 => Сначала дешевле

                this.carsData = this.carsData.sort((a, b) => {
                    if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return -1;
                    if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return 1;
                    return 0;
                });

                // Формат цены: $80000 (убираю знак '$' и перевожу в число)
                this.carsData = this.carsData.sort((a, b) => Number(a.price.substring(1)) - Number(b.price.substring(1)));
                break;
            }

            case 6: {
                // sortingType: 6 => Сначала дороже

                this.carsData = this.carsData.sort((a, b) => {
                    if((a.brand + a.model).toLowerCase() < (b.brand + b.model).toLowerCase()) return -1;
                    if((a.brand + a.model).toLowerCase() > (b.brand + b.model).toLowerCase()) return 1;
                    return 0;
                });

                // Формат цены: $80000 (убираю знак '$' и перевожу в число)
                this.carsData = this.carsData.sort((a, b) => Number(b.price.substring(1)) - Number(a.price.substring(1)));
                break;
            }
        }
        
    }

    addFavorite (carInstance:any|{}) {
        this.carsFavorite.push(carInstance);
        // this.carsFavoriteIds.push(carInstance.id);
    }

    removeFavorite (carInstance:any|{}) {
        this.carsFavorite = this.carsFavorite.filter(car => car.id !== carInstance.id);
        // this.carsFavoriteIds = this.carsFavoriteIds.filter(carId => carId !== carInstance.id);
    }

}

export default new CarsMobx()