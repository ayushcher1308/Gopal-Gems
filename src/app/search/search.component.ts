import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiamondConfig } from '../../json/diamond-shapes';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private saveFiltersService: SearchService
  ) {}

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
  fromCarat: any = '';
  toCarat: any = '';
  fromAmount: any;
  toAmount: any;
  fromRap: any = '';
  toRap: any = '';
  diamondId: any = '';
  fromPriceCts: any = '';
  toPriceCts: any = '';
  message: any;

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('search')[0];
    element.classList.add('active');
  }

  search() {
    this.searchByFilters();
    this.router.navigate(['/dashboard/search-result']);
  }

  searchByFilters() {
    var filters: any = {};

    //search by Carat Range
    if (this.fromCarat != '' || this.toCarat != '') {
      var carat: any = {};
      if (this.fromCarat != '') {
        carat.$gt = this.fromCarat;
      }
      if (this.toCarat != '') {
        carat.$lt = this.toCarat;
      }
      filters.Carat = carat;
    }

    //search by Price/Cts
    if (this.fromPriceCts != '' || this.toPriceCts != '') {
      var PriceCts: any = {};
      if (this.fromPriceCts != '') {
        PriceCts.$gt = this.fromPriceCts;
      }
      if (this.toPriceCts != '') {
        PriceCts.$lt = this.toPriceCts;
      }
      filters.pr_ct = PriceCts;
    }

    // search by Rap
    if (this.fromRap != '' || this.toRap != '') {
      var Rap: any = {};
      if (this.fromRap != '') {
        Rap.$gt = this.fromRap;
      }
      if (this.toRap != '') {
        Rap.$lt = this.toRap;
      }
      filters.Rap = Rap;
    }

    // search by ID
    if (this.diamondId != '') {
      filters.stockNo = this.diamondId;
    }

    // search By Shapes
    var shapes: any = [];
    for (var i = 0; i < this.diamondShapes.length; i++) {
      if (this.diamondShapes[i].selected)
        shapes.push(this.diamondShapes[i].shape.toUpperCase());
    }
    if (shapes.length != 0) {
      filters.Shape = { $in: shapes };
    }

    //search by Color
    if (!this.Color[0].selected) {
      var colors: any = [];
      for (var i = 1; i < this.Color.length; i++) {
        if (this.Color[i].selected) colors.push(this.Color[i].value);
      }
      filters.Color = { $in: colors };
    }

    //search by Clarity
    if (!this.Clarity[0].selected) {
      var clarity: any = [];
      for (var i = 1; i < this.Clarity.length; i++) {
        if (this.Clarity[i].selected) clarity.push(this.Clarity[i].value);
      }
      filters.Clarity = { $in: clarity };
    }

    // search by Fluorescence
    if (!this.Fluorescence[0].selected) {
      var fluorescences: any = [];
      for (var i = 1; i < this.Fluorescence.length; i++) {
        if (this.Fluorescence[i].selected)
          fluorescences.push(this.Fluorescence[i].value);
      }
      filters.Fluorescent = { $in: fluorescences };
    }

    // search by Milky
    if (!this.Milky[0].selected) {
      var Milkys: any = [];
      for (var i = 1; i < this.Milky.length; i++) {
        if (this.Milky[i].selected) Milkys.push(this.Milky[i].value);
      }
      filters.MILKY = { $in: Milkys };
    }

    // search by Lab
    if (!this.Lab[0].selected) {
      var Labs: any = [];
      for (var i = 1; i < this.Lab.length; i++) {
        if (this.Lab[i].selected) Labs.push(this.Lab[i].value);
      }
      filters.LAB = { $in: Labs };
    }

    // search by HeartNArrow
    if (!this.HeartNArrow[0].selected) {
      var HeartNArrows: any = [];
      for (var i = 1; i < this.HeartNArrow.length; i++) {
        if (this.HeartNArrow[i].selected)
          HeartNArrows.push(this.HeartNArrow[i].value);
      }
      filters.HA = { $in: HeartNArrows };
    }

    // search by Location
    if (!this.Location[0].selected) {
      var Locations: any = [];
      for (var i = 1; i < this.Location.length; i++) {
        if (this.Location[i].selected)
          Locations.push(this.Location[i].value.toUpperCase());
      }
      filters.Location = { $in: Locations };
    }

    // search by Cut
    if (!this.cutValue[0].selected) {
      var cutValues: any = [];
      for (var i = 1; i < this.cutValue.length; i++) {
        if (this.cutValue[i].selected) cutValues.push(this.cutValue[i].match);
      }
      filters.Cut = { $in: cutValues };
    }

    // search by Polish
    if (!this.Polish[0].selected) {
      var Polishs: any = [];
      for (var i = 1; i < this.Polish.length; i++) {
        if (this.Polish[i].selected) Polishs.push(this.Polish[i].match);
      }
      filters.Polish = { $in: Polishs };
    }

    // search by symmetry
    if (!this.symmetry[0].selected) {
      var symmetrys: any = [];
      for (var i = 1; i < this.symmetry.length; i++) {
        if (this.symmetry[i].selected) symmetrys.push(this.symmetry[i].match);
      }
      filters.Symmetry = { $in: symmetrys };
    }

    this.saveFiltersService.setData(filters);
  }

  selectShape(index: any) {
    this.diamondShapes[index].selected = !this.diamondShapes[index].selected;
  }

  showAlert() {
    var x = document.getElementsByClassName('snackbar')[0];
    x.classList.add('show');
    setTimeout(function () {
      x.classList.remove('show');
    }, 3000);
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
