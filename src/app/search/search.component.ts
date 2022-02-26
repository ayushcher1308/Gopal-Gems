import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiamondConfig } from '../../json/diamond-shapes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private router:Router) {}

  diamondShapes = DiamondConfig.shape;
  cutValue = DiamondConfig.cut;
  symmetry = DiamondConfig.symmetry;
  Color = DiamondConfig.color;
  Clarity = DiamondConfig.Clarity;
  Fluorescence = DiamondConfig.Fluorescence;
  Milky = DiamondConfig.Milky;
  Polish = DiamondConfig.Polish;
  Lab = DiamondConfig.Lab;
  ColorShade = DiamondConfig.ColorShade;
  HeartNArrow = DiamondConfig.HeartNArrow;
  Provenance = DiamondConfig.Provenance;
  Location = DiamondConfig.Location;
  fromCarat: any;
  toCarat: any;
  fromAmount: any;
  toAmount: any;
  fromRap: any;
  toRap: any;
  diamondId: any;
  fromPriceCts: any;
  toPriceCts: any;

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('search')[0];
    element.classList.add('active');
  }

  search(){
    this.router.navigate(['/dashboard/search-result'])
  }

  selectShape(index: any) {
    this.diamondShapes[index].selected = !this.diamondShapes[index].selected;
  }

  resetCarat() {
    this.fromCarat = '';
    this.toCarat = '';
  }

  selectCut(index: any) {
    if (index == 0 && !this.cutValue[0].selected) {
      this.cutValue[0].selected = true;
      for (var i = 1; i < this.cutValue.length; i++)
        this.cutValue[i].selected = false;
      return;
    }
    if (index != 0) {
      this.cutValue[0].selected = false;
    }
    this.cutValue[index].selected = !this.cutValue[index].selected;
    this.cutValue[0].selected = this.checkAnyButtonSelected(this.cutValue);
  }

  selectColorShade(index: any) {
    if (index == 0 && !this.ColorShade[0].selected) {
      this.ColorShade[0].selected = true;
      for (var i = 1; i < this.ColorShade.length; i++)
        this.ColorShade[i].selected = false;
      return;
    }
    if (index != 0) {
      this.ColorShade[0].selected = false;
    }
    this.ColorShade[index].selected = !this.ColorShade[index].selected;
    this.ColorShade[0].selected = this.checkAnyButtonSelected(this.ColorShade);
  }

  selectHeartNArrow(index: any) {
    if (index == 0 && !this.HeartNArrow[0].selected) {
      this.HeartNArrow[0].selected = true;
      for (var i = 1; i < this.HeartNArrow.length; i++)
        this.HeartNArrow[i].selected = false;
      return;
    }
    if (index != 0) {
      this.HeartNArrow[0].selected = false;
    }
    this.HeartNArrow[index].selected = !this.HeartNArrow[index].selected;
    this.HeartNArrow[0].selected = this.checkAnyButtonSelected(
      this.HeartNArrow
    );
  }

  selectClarity(index: any) {
    if (index == 0 && !this.Clarity[0].selected) {
      this.Clarity[0].selected = true;
      for (var i = 1; i < this.Clarity.length; i++)
        this.Clarity[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Clarity[0].selected = false;
    }
    this.Clarity[index].selected = !this.Clarity[index].selected;
    this.Clarity[0].selected = this.checkAnyButtonSelected(this.Clarity);
  }

  selectSymmetry(index: any) {
    if (index == 0 && !this.symmetry[0].selected) {
      this.symmetry[0].selected = true;
      for (var i = 1; i < this.symmetry.length; i++)
        this.symmetry[i].selected = false;
      return;
    }
    if (index != 0) {
      this.symmetry[0].selected = false;
    }
    this.symmetry[index].selected = !this.symmetry[index].selected;
    this.symmetry[0].selected = this.checkAnyButtonSelected(this.symmetry);
  }

  selectFluorescence(index: any) {
    if (index == 0 && !this.Fluorescence[0].selected) {
      this.Fluorescence[0].selected = true;
      for (var i = 1; i < this.Fluorescence.length; i++)
        this.Fluorescence[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Fluorescence[0].selected = false;
    }
    this.Fluorescence[index].selected = !this.Fluorescence[index].selected;
    this.Fluorescence[0].selected = this.checkAnyButtonSelected(
      this.Fluorescence
    );
  }

  selectLocation(index: any) {
    if (index == 0 && !this.Location[0].selected) {
      this.Location[0].selected = true;
      for (var i = 1; i < this.Location.length; i++)
        this.Location[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Location[0].selected = false;
    }
    this.Location[index].selected = !this.Location[index].selected;
    this.Location[0].selected = this.checkAnyButtonSelected(this.Location);
  }

  selectProvenance(index: any) {
    if (index == 0 && !this.Provenance[0].selected) {
      this.Provenance[0].selected = true;
      for (var i = 1; i < this.Provenance.length; i++)
        this.Provenance[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Provenance[0].selected = false;
    }
    this.Provenance[index].selected = !this.Provenance[index].selected;
    this.Provenance[0].selected = this.checkAnyButtonSelected(this.Provenance);
  }

  selectColor(index: any) {
    if (index == 0 && !this.Color[0].selected) {
      this.Color[0].selected = true;
      for (var i = 1; i < this.Color.length; i++)
        this.Color[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Color[0].selected = false;
    }
    this.Color[index].selected = !this.Color[index].selected;
    this.Color[0].selected = this.checkAnyButtonSelected(this.Color);
  }

  selectMilky(index: any) {
    if (index == 0 && !this.Milky[0].selected) {
      this.Milky[0].selected = true;
      for (var i = 1; i < this.Milky.length; i++)
        this.Milky[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Milky[0].selected = false;
    }
    this.Milky[index].selected = !this.Milky[index].selected;
    this.Milky[0].selected = this.checkAnyButtonSelected(this.Milky);
  }

  selectPolish(index: any) {
    if (index == 0 && !this.Polish[0].selected) {
      this.Polish[0].selected = true;
      for (var i = 1; i < this.Polish.length; i++)
        this.Polish[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Polish[0].selected = false;
    }
    this.Polish[index].selected = !this.Polish[index].selected;
    this.Polish[0].selected = this.checkAnyButtonSelected(this.Polish);
  }

  selectLab(index: any) {
    if (index == 0 && !this.Lab[0].selected) {
      this.Lab[0].selected = true;
      for (var i = 1; i < this.Lab.length; i++) this.Lab[i].selected = false;
      return;
    }
    if (index != 0) {
      this.Lab[0].selected = false;
    }
    this.Lab[index].selected = !this.Lab[index].selected;
    this.Lab[0].selected = this.checkAnyButtonSelected(this.Lab);
  }

  checkAnyButtonSelected(array: any) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].selected) return false;
    }
    return true;
  }
}
